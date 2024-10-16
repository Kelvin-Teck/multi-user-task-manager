export default {
  env: "production",
  baseUrl: process.env.BASE_URL!,
  secretKey: process.env.SECRET_KEY!,
  app: {
    port: process.env.PORT || 3000,
  },
  mail: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  database: {
    host: process.env.PRODUCTION_DATABASE_HOST,
    port: Number(process.env.PRODUCTION_DATABASE_PORT) || 3306,
    user: process.env.PRODUCTION_DATABASE_USER,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    ssl: { rejectUnauthorized: false, requestCert: false },
    dialect: "postgres",
  },
  logging: {
    level: "error",
  },
  crypto: {
    password: process.env.CRYPTO_KEY,
    salt: process.env.CRYPTO_SALT,
  },
} as const;
