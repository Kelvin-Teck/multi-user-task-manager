import {
  commentRespository,
  notificationRepository,
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
  const { userId } = req.params; //params
  const { title, description, dueDate } = req.body; //user Input

  const data = {
    title,
    description,
    dueDate,
    userId,
    status: req.body.status,
    tag: req.body.tag,
  };

  // validate user input
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

  await taskRepository.createTask(inputedData); //create Task
};

export const assignTaskService = async (req: Request) => {
  // Fetching logged In User
  const loggedInUserId = typeof req.user === "object" ? req.user.id : null; //logged in user Id
  const { taskId, assigneeId } = req.body; //user input

  const data = { taskId, assigneeId };

  // validate User input
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

  await taskRepository.assignTask(inputedData.assigneeId, inputedData.taskId); //assign task to a user

  const assigner = await userRepository.retriveSingleUserById(loggedInUserId); //Task Assigner data

  const notificationData = {
    userId: assigneeId,
    title: "Task Assignment",
    message: `You have been assigned a task by ${assigner?.firstName} ${assigner?.lastName} `,
  };

  await notificationRepository.createNotification(notificationData); //create notification
  /*Send Out a Notificatin E-mail */
  //  const mailOptions = {
  //     from: 'your-email@gmail.com',
  //     to: 'recipient-email@example.com',
  //     subject: 'Test Email with Handlebars',
  //     template: 'emailTemplate',
  //     context: {
  //       name: 'John Doe',
  //     },
  //   };
};

export const modifyTaskStatusService = async (req: Request) => {
  const loggedInUserId = typeof req.user === "object" ? req.user.id : ""; //Fetching Logged in user

  const { userId } = req.params;
  const { status } = req.body;

  // Validate user input
  const { error, value } = validateModifyTaskStatusEntry({ status });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const statusCode: string[] = ["to-do", "in-progress", "completed"]; //possible status data 0,1,2

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

  await taskRepository.modifyTaskStatus(statusCode[status], userId); //modify Task Status
};

export const retrieveTasksService = async (req: Request) => {
  const { tag, status, sortBy, order } = req.query; //query filters
  const sort = { field: sortBy, order }; //sorting data
  const filter = { tag, status, sort }; //filter data

  const tasks = await taskRepository.retrieveAllTasks(filter);
  if (tasks?.length === 0) {
    return newError(
      "No Task(s) exist with these specified filter parameter",
      HttpStatus.NOT_FOUND
    );
  }

  return tasks;
};

export const addCommentToTaskService = async (req: Request) => {
  const loggedInUserId = typeof req.user === "object" ? req.user.id : ""; //Fetching Logged in user

  const { taskId } = req.params; //params

  const { comment } = req.body; //user Input

  // validate input
  const { error, value } = validateTaskComment({ comment });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const data = { comment: value.comment, taskId, userId: loggedInUserId };

  await commentRespository.createComment(data); //create comment
};
