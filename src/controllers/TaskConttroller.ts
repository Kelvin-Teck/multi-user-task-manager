import { assignTaskService, createTaskService } from "@services/taskService";
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
