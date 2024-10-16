import { JwtPayload } from "@interfaces";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload: JwtPayload) => {
  const accessToken = jwt.sign(
    { id: payload.id, email: payload.email }, // Payload for access token
    process.env.ACCESS_TOKEN_SECRET as string, // Secret for signing access token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP as string|| "15m", // Default expiry to 15 minutes
    }
  );

  return accessToken
};

export const createRefreshToken = async (payload: JwtPayload) => {
  const refreshToken = jwt.sign(
    { id: payload.id, email: payload.email }, // Payload for refresh token
    process.env.REFRESH_TOKEN_SECRET as string, // Secret for signing refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP as string
 || "7d", // Default expiry to 7 days
    }
  );

  return refreshToken
};

