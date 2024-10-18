import { deleteCommentService, editCommentService } from "@services/commentService";
import { HttpStatus, sendError, sendSuccess } from "@utils";
import { Request, Response } from "express";

export const editCommentController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await editCommentService(req);//Response From Service

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Comment updated Successfully", response));
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

export const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await deleteCommentService(req);//Response From Service

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Comment deleted Successfully", response));
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
