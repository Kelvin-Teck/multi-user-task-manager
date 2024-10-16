import { HttpStatus, sendError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "pg";

// Class-based error handler
class DatabaseErrorHandler {
  // Method to handle the errors
  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    // Handle Postgres unique constraint violation (code 23505)
    if (err instanceof DatabaseError && err.code === "23505") {
      return res
        .status(HttpStatus.CONFLICT)
        .json(
          sendError(
            "The email or username already exists. Please choose a different one.",
            HttpStatus.CONFLICT
          )
        );
    }

    // Handle other errors
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";

    // Log the error (can be extended with a logging library)
    console.error(`Error: ${errorMessage}, Code: ${statusCode}`);

    // Respond with the error message
    res.status(statusCode).json({
      status: "ERROR",
      code: statusCode,
      message: errorMessage,
    });
  }
}

export default new DatabaseErrorHandler();
