import express from "express";
import { Request, Response } from "express";
import authRoute from '@routes/authRoute'
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import DatabaseError from "@errors/databaseError";

const app = express();

/* Cors Config Options */
const corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Custom headers allowed
  credentials: true, // Allow credentials like cookies or authentication headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on status 204 for OPTIONS
};

//General Middleware Initailization
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(morgan("tiny"));
app.use(cookieParser());

/* routes middleware Initialization*/
app.use("/api/v1/auth", authRoute);

// This is middleware to Check the Status of the Server
app.use("/", (req: Request, res: Response) => {
  res.send("Server is Up and Running on!!!");
});

// Database Error Handler Midddleware
app.use(DatabaseError.handleError);

export default app;
