import { DataTypes } from "@sequelize/core";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable("", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};

export const down: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable("");
};
