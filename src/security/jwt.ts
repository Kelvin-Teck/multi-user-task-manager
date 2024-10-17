import { CustomJwtPayload, JwtSignPayload } from "@interfaces";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import { newError } from "@utils";

export const createAccessToken = (payload: JwtSignPayload) => {
  const accessToken = jwt.sign(
    { id: payload.id, email: payload.email,role: payload.role }, // Payload for access token
    process.env.ACCESS_TOKEN_SECRET as string, // Secret for signing access token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP as string|| "15m", // Default expiry to 15 minutes
    }
  );

  return accessToken
};

export const createRefreshToken = async (payload: JwtSignPayload) => {
  const refreshToken = jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role }, // Payload for refresh token
    process.env.REFRESH_TOKEN_SECRET as string, // Secret for signing refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP as string
 || "7d", // Default expiry to 7 days
    }
  );

  return refreshToken
};

export const verifyAccessToken = async (token: string): Promise<boolean> => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as CustomJwtPayload  ;
    console.log(decoded);
    //  checking the token's expiration
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      return false; // Token has expired
    }

    // If verification is successful, return true
    return true;
  } catch (error) {
    // Log error details for debugging
    console.error("Token verification failed:", error);
    return false; // Token is invalid or verification failed
  }
};