export default {
  env: "development",

  app: {
    port: process.env.PORT,
  },
  mail: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  database: {
    host: process.env.DEV_DATABASE_HOST!,
    port: Number(process.env.DEV_DATABASE_PORT),
    user: process.env.DEV_DATABASE_USER!,
    password: process.env.DEV_DATABASE_PASSWORD!,
    database: process.env.DEV_DATABASE_NAME!,
  },
  logging: {
    level: "debug",
  },
} as const;
