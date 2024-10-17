import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { PostgresDialect } from "@sequelize/postgres";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model";

// const sequelize = new Sequelize({ dialect: PostgresDialect });

export default class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  @Attribute(DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare description: string;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare dueDate: Date;

  @Attribute(DataTypes.ENUM("to-do", "in-progress", "completed"))
  @NotNull
  @Default("to-do")
  declare status: "to-do" | "in-progress" | "completed";

  declare userId: string;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare createdAt: Date;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare updatedAt: Date;

  // Initialize the model
  static initialize(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
          type: DataTypes.ENUM("To-Do", "In Progress", "Completed"),
          allowNull: false,
          defaultValue: "To-Do",
        },
        userId: {
          // Define the foreign key
          type: DataTypes.UUID, // Assuming User ID is UUID
          allowNull: false, // Make it required
          references: {
            model: User, // Reference to the User model
            key: "id", // Key in the User model
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize, // Pass the Sequelize instance
        tableName: "Tasks", // Specify the table name
        timestamps: true, //TimeStamps
      }
    );
  }
}
