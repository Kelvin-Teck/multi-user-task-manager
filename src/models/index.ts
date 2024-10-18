import Comment from "./comment.model";
import Task from "./task.model";
import User from "./user.model";
import sequelize from "@database";

export const models = {
  User: User,
  Task: Task,
  Comment: Comment,
};

const db = { ...models };

export default db;
