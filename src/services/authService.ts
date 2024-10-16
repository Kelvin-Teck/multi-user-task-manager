import { comparePassword, hashPassword } from "@security/bcrypt";
import { validateUser, validateUserSignIn } from "@security/joi";
import { Request, Response } from "express";
import { userRepository } from "@repositories";
import { HttpStatus, newError } from "@utils";
import { createAccessToken, createRefreshToken } from "@security/jwt";

export const createUserService = async (req: Request) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const data = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  };

  const { error, value } = validateUser(data);

  if (error) {
    const errorMessages = error.details.map((err: { message: any; } ) => err.message);

    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const userInfoByEmail = await userRepository.getSingleUserByEmail(
    value.email
  );
  const userInfoByPhoneNumber = await userRepository.getSingleUserByPhoneNumber(
    value.phoneNumber
  );

  if (userInfoByEmail) {
    return newError(
      "A User already exists with this email...Try another Email ",
      HttpStatus.CONFLICT
    );
  }

  if (userInfoByPhoneNumber) {
    return newError(
      "A User already exists with this phone number...Try another Phone Number ",
      HttpStatus.CONFLICT
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUserData = { ...value, password: hashedPassword };

  await userRepository.createUser(newUserData);
};

export const loginUserService = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = { email, password };
  const { error, value } = validateUserSignIn(data);

  if (error) {
    const errorMessages = error.details.map((err: { message: any; }) => err.message);
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };
  const userInfo = await userRepository.getSingleUserByEmail(inputedData.email);

  if (userInfo) {
    // check validity of password

    const isPasswordValid = await comparePassword(
      inputedData.password,
      userInfo.password
    );

    if (!isPasswordValid)
      return newError("Incorrect Credentials Provided", HttpStatus.FORBIDDEN);

    const tokenPayload = { id: userInfo.id, email: userInfo.email };
    const accessToken = await createAccessToken(tokenPayload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // ensure this is true in production (HTTPS)
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    const refreshToken = await createRefreshToken(tokenPayload);
    // Send refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { password, ...safeuserData } = userInfo.dataValues;

    const formatedResponse = { token: accessToken, user: safeuserData };

    return formatedResponse;
  } else {
    return newError("No User with these Credentials", HttpStatus.FORBIDDEN);
  }
};
