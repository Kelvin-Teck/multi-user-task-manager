import { NextFunction, Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/";
import { createUserService, loginUserService } from "../services/authService";
import { HttpStatus } from "../utils/";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await createUserService(req);

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("User Created Successfully", response));
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

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await loginUserService(req, res);
    return res
      .status(HttpStatus.OK)
      .json(sendSuccess("User Successfuly Signed In", response));
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(sendError(error.message, error.staus));
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        sendError("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
      );
  }
};
