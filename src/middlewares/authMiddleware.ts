import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import { HttpStatus, newError } from "@utils";
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

export const AuthGuard = async (req: Request, res:Response, next:NextFunction) => {
  const authorization = req.headers["authorization"];

  if (!authorization)
    return newError("Invalid Token Provided", HttpStatus.UNAUTHORIZED);

  const token = authorization.split(" ")[1];

  if (!token) return newError('Invalid Token', HttpStatus.FORBIDDEN);

  const isValid = verifyAccessToken(token);

  if (!isValid) return newError('Token has Expired', HttpStatus.UNAUTHORIZED);

  next();
};


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  
}