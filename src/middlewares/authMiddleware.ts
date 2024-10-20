import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import { HttpStatus, newError, sendError } from "@utils";
import { verifyAccessToken } from "@security/jwt";

// Function to create and return a rate limiter middleware
export const createRateLimiter = (
  maxRequests: number,
  windowMinutes: number
) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // windowMinutes in milliseconds
    max: maxRequests, // limit each IP to maxRequests per windowMs
    message: {
      status: HttpStatus.TOO_MANY_REQUESTS, // Too Many Requests
      message: "Too many login attempts, please try again later.",
    },
    handler: (req: Request, res: Response, next: NextFunction) => {
      res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        error: "Too many login attempts. Please try again later.",
      });
    },
  });
};

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization)
      return newError(
        "No Authorization Header Provided",
        HttpStatus.UNAUTHORIZED
      );

    const token = authorization.split(" ")[1]; //Bearer XXXXXXXXXXXXXXXXXXX

    if (!token) return newError("No Token Provided", HttpStatus.FORBIDDEN);//returns error if no Token Provided

    const decoded = await verifyAccessToken(token);//Return users endoded/encrypted data

    if (!decoded) return newError("Token has Expired", HttpStatus.UNAUTHORIZED);//Returns Error at Failure to decrypt

    req.user = decoded;//Store decoded data to the request handler

    next();//move To the next middleware
  } catch (error: any) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json(
        sendError(
          `Invalid Token --- ${error.message}...Try Logging in again`,
          HttpStatus.FORBIDDEN
        )
      );
  }
};

export const AdminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && typeof req.user !== "string" && req.user.role === "admin") {
    return next();//Move To the next middleware
  } else {
    return newError("Access denied, Admins only", HttpStatus.FORBIDDEN);
  }
};
