import { commentRespository } from "@repositories";
import { validateTaskComment } from "@security/joi";
import { HttpStatus, newError } from "@utils";
import { Request } from "express";


export const editCommentService = async (req: Request) => {
  // Fetching logged In User
    const userId = typeof req.user === "object" ? req.user.id : null;
    
  const { commentId } = req.params;
  const { comment } = req.body;
  const { error, value } = validateTaskComment({ comment });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const existingComment = await commentRespository.retrieveSingleCommentById(
    commentId
  );

  if (!existingComment) {
    return newError("This comment does not exist", HttpStatus.NOT_FOUND);
  }

  if (existingComment.userId !== userId) {
    return newError(
      "Access Denied, You do not have the Permission to edit another users comment(s)",
      HttpStatus.FORBIDDEN
    );
  }

    const data = { comment: value.comment, commentId, userId };

    await commentRespository.modifyComment(data)
};

export const deleteCommentService = async (req: Request) => {
  // Fetching logged In User
  const userId = typeof req.user === "object" ? req.user.id : null;

    const { commentId } = req.params;
    
      const existingComment =
        await commentRespository.retrieveSingleCommentById(commentId);

      if (!existingComment) {
        return newError("This comment does not exist", HttpStatus.NOT_FOUND);
      }

      if (existingComment.userId !== userId) {
        return newError(
          "Access Denied, You do not have the Permission to edit another users comment(s)",
          HttpStatus.FORBIDDEN
        );
    }
    
    await commentRespository.deleteCommentById(commentId);

}
