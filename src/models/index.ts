import User from './user.model'
import sequelize from '@database';

export const models =  {
User: User
};

const db = { ...models };

export default db;