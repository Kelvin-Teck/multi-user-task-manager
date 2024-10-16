export default {
  env: "test",
  baseUrl: "http://localhost:3000",
  secretKey: "123456",
  app: {
    port: 3001,
  },
  mail: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "app_test",
    dialect: "mysql",
  },
  logging: {
    level: "warn",
  },
  crypto: {
    password: "6544321",
    salt: "dev0988212:4238923",
  },
} as const;
