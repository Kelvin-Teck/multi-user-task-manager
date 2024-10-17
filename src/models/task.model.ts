import * as core from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model"; // Import User model

export default class Task extends core.Model<
  core.InferAttributes<Task>,
  core.InferCreationAttributes<Task>
> {
  @Attribute(core.DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(core.DataTypes.TEXT)
  declare description: string;

  @Attribute(core.DataTypes.DATE)
  declare dueDate: Date;

  @Attribute(core.DataTypes.ENUM("to-do", "in-progress", "completed"))
  @NotNull
  @Default("to-do")
  declare status: core.CreationOptional<string>;

  @Attribute(core.DataTypes.UUID) // Foreign key relationship
  @NotNull
  declare userId: string;

  @Attribute(core.DataTypes.UUID)
  declare assigneeId: string;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare createdAt: Date;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare updatedAt: Date;

  // Initialize the model
  static initialize(sequelize: core.Sequelize) {
    Task.init(
      {
        id: {
          type: core.DataTypes.UUID,
          defaultValue: core.DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: core.DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: core.DataTypes.TEXT,
          allowNull: true,
        },
        dueDate: {
          type: core.DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: core.DataTypes.ENUM("to-do", "in-progress", "completed"),
          allowNull: false,
          defaultValue: "to-do",
        },
        userId: {
          type: core.DataTypes.UUID, // Reference the UUID of User
          allowNull: false,
          references: {
            model: User, // Reference to the User model
            key: "id", // Foreign key in the User model
          },
        },
        assigneeId: {
          type: core.DataTypes.UUID,
          allowNull: true,
          references: {
            model: User, // Reference to the User model
            key: "id", // Foreign key in the User model
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
        sequelize, // Pass the Sequelize instance
        tableName: "Tasks", // Specify the table name
        timestamps: true, // Enable timestamps
      }
    );
  }

  // Define associations between Task and User
  static associate() {
    Task.belongsTo(User, { foreignKey: "userId", as: "user" });
  }
}
