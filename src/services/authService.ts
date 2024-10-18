import { comparePassword, hashPassword } from "@security/bcrypt";
import { validateUserSignUp, validateUserSignIn } from "@security/joi";
import { Request, Response } from "express";
import { userRepository } from "@repositories";
import { HttpStatus, newError } from "@utils";
import { createAccessToken, createRefreshToken } from "@security/jwt";

export const createUserService = async (req: Request) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body; //User Input
  const data = {
    firstName,
    lastName,
    email,
    phoneNumber,
    role: req.body.role || "user",
    password,
  };

  // Validate User Input
  const { error, value } = validateUserSignUp(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  // get user info by email
  const userInfoByEmail = await userRepository.getSingleUserByEmail(
    value.email
  );

  // get user info by phone
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

  const hashedPassword = await hashPassword(password);//encrypt password

  const newUserData = { ...value, password: hashedPassword };

  await userRepository.createUser(newUserData);//create a new user
};

export const loginUserService = async (req: Request, res: Response) => {
  const { email, password } = req.body;//user Input
  const data = { email, password };

  //validate user Input
  const { error, value } = validateUserSignIn(data);

  if (error) {
    const errorMessages = error.details.map(
      (err: { message: any }) => err.message
    );
    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };
  const userInfo = await userRepository.getSingleUserByEmail(inputedData.email);//fetch user 

  if (userInfo) {
    // check validity of password
    const isPasswordValid = await comparePassword(
      inputedData.password,
      userInfo.password
    );

    if (!isPasswordValid)
      return newError("Incorrect Credentials Provided", HttpStatus.FORBIDDEN);

    const tokenPayload = {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    };

    const accessToken = createAccessToken(tokenPayload);//generate access token

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // ensure this is true in production (HTTPS)
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    const refreshToken = await createRefreshToken(tokenPayload);//generate refresh token
    // Send refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { password, ...safeuserData } = userInfo.get();

    const formatedResponse = { token: accessToken, user: safeuserData };

    return formatedResponse;//return response to client
  } else {
    return newError("No User with these Credentials", HttpStatus.FORBIDDEN);
  }
};
