import { DataTypes } from "@sequelize/core";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.addColumn("", "", {
    type: DataTypes.STRING,
    allowNull: false,
  });
};

export const down: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.removeColumn("", "");
};
