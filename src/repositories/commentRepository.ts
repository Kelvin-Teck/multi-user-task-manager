import db from "@models";
import Comment from "@models/comment.model";

export const createComment = async (data: any) => {
  await db.Comment.create(data);
};

export const retrieveSingleCommentById = async (
  commentId: string
): Promise<Comment | null> => {
  const comment = await db.Comment.findByPk(commentId);

  return comment;
};

export const modifyComment = async (data: any): Promise<void> => {
  await db.Comment.update({ ...data }, { where: { id: data.commentId } });
};

export const deleteCommentById = async (commentId: string): Promise<void> => {
  await db.Comment.destroy({where: {id: commentId}} );
};
