import * as core from "@sequelize/core";

import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Default,
} from "@sequelize/core/decorators-legacy";
import { PostgresDialect } from "@sequelize/postgres";
import { v4 as uuidv4 } from "uuid";

// const sequelize = new Sequelize({ dialect: PostgresDialect });

export default class User extends core.Model<
  core.InferAttributes<User>,
  core.InferCreationAttributes<User>
> {
  @Attribute(core.DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare lastName: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare phoneNumber: string;

  @Attribute(core.DataTypes.ENUM("admin", "user"))
  @NotNull
  @Default("user")
  declare role: core.CreationOptional<string>;

  @Attribute(core.DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare createdAt: Date;

  @Attribute(core.DataTypes.DATE)
  @Default(core.DataTypes.NOW)
  declare updatedAt: Date;

  // Initialize the model
  static initialize(sequelize: core.Sequelize) {
    User.init(
      {
        id: {
          type: core.DataTypes.UUID,
          defaultValue: core.DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: core.DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: core.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: core.DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: core.DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: core.DataTypes.ENUM("admin", "user"),
          allowNull: false,
          defaultValue: 'user'
        },

        password: {
          type: core.DataTypes.STRING,
          allowNull: false,
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
        tableName: "Users", // Specify the table name
        timestamps: true //TimeStamps
      }
    );
  }
}
