require("dotenv").config();

import development from "./env/development";
import production from "./env/production";
import test from "./env/test";

import { Response } from "express";
// import transporter from "./transporter";


const configs = {
  development,
  production,
  test,
} as const;

// Use `NODE_ENV` to select the appropriate configuration
const env =
  (process.env.NODE_ENV as "production" | "development") || "development";

const activeConfig = configs[env];


export default activeConfig;
