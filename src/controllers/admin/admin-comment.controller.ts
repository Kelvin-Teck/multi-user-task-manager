import { deleteCommentAdminService } from "@services/admin/admin-comment.service";
import { HttpStatus, sendError, sendSuccess } from "@utils";
import { Request, Response } from "express";

export const deleteCommentAdminController = async (req: Request, res: Response): Promise<any> => {
      try {
        const response = await deleteCommentAdminService(req);

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
}
