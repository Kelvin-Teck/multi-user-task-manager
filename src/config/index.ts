require("dotenv").config();

import development from "./env/development";
import production from "./env/production";
import test from "./env/test";
import { Response } from "express";

const configs = {
  development,
  production,
  test,
} as const;

// Use `NODE_ENV` to select the appropriate configuration
const env =
  (process.env.NODE_ENV as "production" | "development") || "development";

const activeConfig = configs[env];

// export const staticConfig = {
//   dotfiles: "ignore",
//   etag: false,
//   extensions: ["htm", "html", "png", "jpg", "jpeg", "mp4"],
//   index: false,
//   maxAge: "1d",
//   redirect: false,
//   setHeaders(res: Response, path: string, stat: string) {
//     res.set("x-timestamp", Date.now().toString());
//   },
// };

// export const sessionConfig = {
//   secret: activeConfig.secretKey,
//   resave: false,
//   name: "sid",
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24,
//   },
// };

export default activeConfig;
