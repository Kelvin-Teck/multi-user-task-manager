import { commentRespository } from "@repositories";
import { HttpStatus, newError } from "@utils";
import { Request } from "express";

export const deleteCommentAdminService = async (req: Request) => {
  
  const userRole = typeof req.user === "object" ? req.user.role : null;//Logged in user's role

  if (userRole !== "admin")
    return newError(
      "You are not an Admin, You don't have the permission to delete another user's comment(s) ",
      HttpStatus.UNAUTHORIZED
    );

  const { commentId } = req.params;

// check if comment exists
  const existingComment = await commentRespository.retrieveSingleCommentById(
    commentId
  );

  if (!existingComment) {
    return newError("This comment does not exist", HttpStatus.NOT_FOUND);
  }

  await commentRespository.deleteCommentById(commentId);//delete Comment
};
