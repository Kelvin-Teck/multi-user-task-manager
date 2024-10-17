import Task from './task.model';
import User from './user.model'
import sequelize from '@database';

export const models =  {
    User: User,
    Task: Task
};

const db = { ...models };

export default db;