import { userRepository } from "@repositories";
import { hashPassword } from "@security/bcrypt";
import { validateUserSignUp } from "@security/joi";
import { HttpStatus, newError } from "@utils";
import { Request } from "express";

export const createAdminService = async (req: Request) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const data = { firstName, lastName, email, phoneNumber, password };

  const { error, value } = validateUserSignUp(data);

  if (error) {
    const errorMessages = error.details.map((err) => err.message);

    return newError(errorMessages[0], HttpStatus.FORBIDDEN);
  }

  const inputedData = { ...value };
  const userInfo = await userRepository.getSingleUserByEmail(inputedData.email);

  if (userInfo) return newError("This User already Exists", HttpStatus.CONFLICT);

  const hashedPassword = await hashPassword(inputedData.password);

  const newAdmin = {
    firstName,
    lastName,
    email,
    phoneNumber,
    role: "admin",
    password: hashedPassword,
  };

  await userRepository.createUser(newAdmin);
};
