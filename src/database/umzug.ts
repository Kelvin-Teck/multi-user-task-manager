import { Sequelize } from "@sequelize/core";
import { Umzug, SequelizeStorage } from "umzug";
import config from "@config/index";
import path from "path";
import fs from "fs";
import sequelize from "database";

// const { user } = config.database;

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "migration_meta",
  }),
  create: {
    folder: "src/database/migrations",
    template: (filepath) => [
      [
        filepath,
        fs
          .readFileSync(
            path.join(
              __dirname,
              filepath.includes("add")
                ? "template/add-migration.ts"
                : "template/create-migration.ts"
            )
          )
          .toString(),
      ],
    ],
  },
  logger: console,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ["src/database/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta",
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;
