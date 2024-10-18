import db from "@models";
import Comment from "@models/comment.model";

export const createComment = async (data: any) => {
  await db.Comment.create(data);//commit comment data to the DB
}; 

export const retrieveSingleCommentById = async (
  commentId: string
): Promise<Comment | null> => {
  const comment = await db.Comment.findByPk(commentId);//Retrieved comment data by commentId

  return comment;
};

export const modifyComment = async (data: any): Promise<void> => {
  await db.Comment.update({ ...data }, { where: { id: data.commentId } });//update comment data
};

export const deleteCommentById = async (commentId: string): Promise<void> => {
  await db.Comment.destroy({where: {id: commentId}} );//Delete Comment Data
};
