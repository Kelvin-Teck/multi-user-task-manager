import * as core from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model";
import Task from "./task.model";

export default class Comment extends core.Model<
  core.InferAttributes<Comment>,
  core.InferCreationAttributes<Comment>
> {
  @Attribute(core.DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(core.DataTypes.TEXT)
  @NotNull
  declare comment: string;

  @Attribute(core.DataTypes.UUID)
  @NotNull
  declare taskId: string;

  @Attribute(core.DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare createdAt: Date;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare updatedAt: Date;

  // Initialize the model
  static initialize(sequelize: core.Sequelize) {
    Comment.init(
      {
        id: {
          type: core.DataTypes.UUID,
          defaultValue: core.DataTypes.UUIDV4,
          primaryKey: true,
        },
        comment: {
          type: core.DataTypes.TEXT,
          allowNull: false,
        },
        taskId: {
          type: core.DataTypes.UUID,
          allowNull: false,
          references: {
            model: Task, // Reference to the Task model
            key: "id",
          },
        },
        userId: {
          type: core.DataTypes.UUID,
          allowNull: false,
          references: {
            model: User, // Reference to the User model
            key: "id",
          },
        },
        createdAt: {
          type: core.DataTypes.DATE,
          defaultValue: core.DataTypes.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: core.DataTypes.DATE,
          defaultValue: core.DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Comments",
        timestamps: true,
      }
    );
  }
}
