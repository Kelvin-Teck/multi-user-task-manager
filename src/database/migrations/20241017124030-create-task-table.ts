import { DataTypes } from "@sequelize/core";
import type { Migration } from "../umzug";
import User from "@models/user.model";

export const up: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable("Tasks", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("to-do", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "to-do",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        table: "Users", // Name of the target table
        key: "id", // Key in the target table
      },
      onUpdate: "CASCADE", // Cascade on update
      onDelete: "SET NULL", // Set foreign key to null if user is deleted
    },
    assigneeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        table: "Users", // Name of the target table
        key: "id", // Key in the target table
      },
      onUpdate: "CASCADE", // Cascade on update
      onDelete: "SET NULL", // Set foreign key to null if user is deleted
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
  await queryInterface.dropTable("Tasks");
};
