import { taskRepository, userRepository } from "@repositories";
import { retriveSingleTaskById } from "@repositories/taskRepository";
import { validateTaskAssignmentInput, validateTaskInput } from "@security/joi";
import { HttpStatus, newError } from "@utils";
import { Request } from "express";

export const createTaskService = async (req: Request) => {
  const { userId } = req.params;
  const { title, description, dueDate } = req.body;

  const data = { title, description, dueDate, userId, status: req.body.status };
  const { error, value } = validateTaskInput(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };

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
