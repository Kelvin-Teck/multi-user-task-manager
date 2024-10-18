import { createAdminService } from "@services/admin/admin-user.service";
import { HttpStatus, sendError, sendSuccess } from "@utils";
import { Request, Response } from "express";

export const createAdminController = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log(req.user);
  try {
    const response = await createAdminService(req);//Response From Service

    res
      .status(HttpStatus.CREATED)
      .json(sendSuccess("Admin Created Successfully", response));
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
