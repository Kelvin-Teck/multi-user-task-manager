import Comment from "./comment.model";
import Notification from "./notification.model";
import Task from "./task.model";
import User from "./user.model";


export const models = {
  User: User,
  Task: Task,
  Comment: Comment,
  Notification: Notification
};//Objects Holding Model

const db = { ...models };

export default db;
