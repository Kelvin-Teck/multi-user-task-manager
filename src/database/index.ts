import config from "@config";
import User from "@models/user.model";
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

const sequelize = new Sequelize({
  ...config.database,
  dialect: PostgresDialect,
  logging: config.env === "development" ? console.log : false,
  models: [User],
});

export default sequelize;
