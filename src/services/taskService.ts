import {
  commentRespository,
  taskRepository,
  userRepository,
} from "@repositories";
import { retriveSingleTaskById } from "@repositories/taskRepository";
import {
  validateFilterTasksByTagEntry,
  validateModifyTaskStatusEntry,
  validateTaskAssignmentInput,
  validateTaskComment,
  validateTaskInput,
} from "@security/joi";
import { HttpStatus, newError } from "@utils";
import { Request } from "express";

export const createTaskService = async (req: Request) => {
  const { userId } = req.params;
  const { title, description, dueDate } = req.body;

  const data = {
    title,
    description,
    dueDate,
    userId,
    status: req.body.status,
    tag: req.body.tag,
  };
  const { error, value } = validateTaskInput(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };

  const existingTask =
    await taskRepository.retrieveTaskSingleByTitleAndDescription(inputedData);

  if (existingTask)
    return newError(
      "A task with this title and description already exixt.",
      HttpStatus.CONFLICT
    );

  await taskRepository.createTask(inputedData);
};

export const assignTaskService = async (req: Request) => {
  const { taskId, assigneeId } = req.body;

  const data = { taskId, assigneeId };

  const { error, value } = validateTaskAssignmentInput(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };

  //  verify if the task exists
  const task = await taskRepository.retriveSingleTaskById(inputedData.taskId);

  if (!task) {
    return newError("Task with this id does not exist", HttpStatus.NOT_FOUND);
  }

  // verify that the assignee exists

  const assignee = await userRepository.retriveSingleUserById(
    inputedData.assigneeId
  );
  if (!assignee) {
    return newError("This is User does not exist", HttpStatus.NOT_FOUND);
  }

  if (task.assigneeId === inputedData.assigneeId) {
    return newError(
      "This user has already been assigned this task",
      HttpStatus.CONFLICT
    );
  }

  await taskRepository.assignTask(inputedData.assigneeId, inputedData.taskId);
};

export const modifyTaskStatusService = async (req: Request) => {
  const loggedInUserId = typeof req.user === "object" ? req.user.id : ""; //Fetching Logged in user

  const { userId } = req.params;
  const { status } = req.body;

  const { error, value } = validateModifyTaskStatusEntry({ status });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const statusCode: string[] = ["to-do", "in-progress", "completed"];

  const task = await taskRepository.retriveSingleTaskByUserId(userId);

  if (!task) return newError("Task does not exist", HttpStatus.NOT_FOUND);

  if (task.userId !== loggedInUserId) {
    return newError(
      "You cannot change the status of another user",
      HttpStatus.FORBIDDEN
    );
  }

  if (task.status === statusCode[status])
    return newError(
      `The Status of this task is already ${statusCode[status]}`,
      HttpStatus.CONFLICT
    );

  await taskRepository.modifyTaskStatus(statusCode[status], userId);
};

export const retrieveFilteredTasksByTagService = async (req: Request) => {
  const tagName = req.query.tagName as string | undefined;
  const data = { tagName };

  const { error, value } = validateFilterTasksByTagEntry(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const tasks = await taskRepository.retrieveAllTasksByTag(value);
  if (tasks?.length === 0) {
    return newError("No Task(s) exist with these tag", HttpStatus.NOT_FOUND);
  }

  return tasks;
};

export const addCommentToTaskService = async (req: Request) => {
  const loggedInUserId = typeof req.user === "object" ? req.user.id : ""; //Fetching Logged in user

  const { taskId } = req.params;

  const { comment } = req.body;

  const { error, value } = validateTaskComment({ comment });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const data = { comment: value.comment, taskId, userId: loggedInUserId };

  await commentRespository.createComment(data);
};
