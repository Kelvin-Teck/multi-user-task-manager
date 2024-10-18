import { DataTypes } from "@sequelize/core";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable("Comments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: "Tasks", // Name of the target table
        key: "id", // Key in the target table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable("Comments");
};
