import express from "express";
import { Request, Response } from "express";
import authRoute from "@routes/authRoute";
import adminUserRoute from "@routes/admin/admin-user.route";
import taskRoute from "@routes/taskRoute";
import commentRoute from "@routes/commentRoute";
import adminCommentRoute from "@routes/admin/admin-comment.route";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import DatabaseError from "@errors/databaseError";
import { corsOptions } from "@config/corsConfig";
import path from "path";

const app = express();

//General Middleware Initailization
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(morgan("tiny"));
app.use(cookieParser());

/* routes middleware Initialization*/

/*Regular User*/
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/comment", commentRoute);

/* Admin*/
app.use("/api/v1/admin/user", adminUserRoute);
app.use("/api/v1/admin/comment", adminCommentRoute);

// This is middleware to Check the Status of the Server
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Up and Running on!!!");
});

// Database Error Handler Midddleware
app.use(DatabaseError.handleError);



export default app;
