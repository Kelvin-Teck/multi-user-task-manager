export default {
  env: "development",

  app: {
    port: process.env.PORT,
  },
  mail: {
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT),
    service: process.env.EMAIL_SERVICE!,
    secure: false,
    auth: { user: process.env.EMAIL_USER!, pass: process.env.EMAIL_PASS! },
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
