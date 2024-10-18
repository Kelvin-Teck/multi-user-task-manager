import * as core from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model";

export default class Notification extends core.Model<
  core.InferAttributes<Notification>,
  core.InferCreationAttributes<Notification>
> {
  @Attribute(core.DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(core.DataTypes.TEXT)
  @NotNull
  declare message: string;

  @Attribute(core.DataTypes.BOOLEAN)
  @Default(false)
  declare read: boolean;

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
    Notification.init(
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
        message: {
          type: core.DataTypes.TEXT,
          allowNull: false,
        },
        read: {
          type: core.DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
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
        tableName: "Notifications",
        timestamps: true,
      }
    );
  }
}
