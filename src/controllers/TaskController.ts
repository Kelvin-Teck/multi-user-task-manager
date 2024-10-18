import {
  addCommentToTaskService,
  assignTaskService,
  createTaskService,
  modifyTaskStatusService,
  retrieveTasksService,
} from "@services/taskService";
import { HttpStatus, sendError, sendSuccess } from "@utils";
import { NextFunction, Request, Response } from "express";

export const createTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await createTaskService(req);

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Task Created Successfully", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(sendError(error.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }
};

export const assignTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await assignTaskService(req);

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Task Assigned Successfully", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(sendError(error.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }
};

export const modifyTaskStatusController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await modifyTaskStatusService(req);

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Task status Modified Successfully", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(sendError(error.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }
};

export const retrieveTasksController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await retrieveTasksService(req); //Response From Service

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Task retrieved Successfully", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(sendError(error.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }
};

export const addCommentToTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await addCommentToTaskService(req); //Response From Service

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Comment added toTask Successfully", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(sendError(error.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }
};
