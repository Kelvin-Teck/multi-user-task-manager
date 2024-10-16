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

// const sequelize = new Sequelize({ dialect: PostgresDialect });

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.UUIDV4)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare lastName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare phoneNumber: string;

  @Attribute(DataTypes.ENUM("admin", "user"))
  @NotNull
  @Default("user")
  declare role: "admin" | "user";

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare createdAt: Date;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare updatedAt: Date;

  // Initialize the model
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "user"),
          allowNull: false,
          defaultValue: 'user'
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
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
        tableName: "Users", // Specify the table name
        timestamps: true //TimeStamps
      }
    );
  }
}
