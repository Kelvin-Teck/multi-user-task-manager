import Joi, { ValidationResult } from "joi";
import { UserInput, UserSignInInput } from "@interfaces";

// Define the user schema with TypeScript types
const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of 3",
    "string.max": "Name should have a maximum length of 30",
    "any.required": "Name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of 3",
    "string.max": "Name should have a maximum length of 30",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  phoneNumber: Joi.string()
    .min(10) // minimum required length
    .max(20) // maximum required length
    .pattern(/^[0-9]+$/) // Ensures only numbers are allowed
    .required() // Makes this field mandatory
    .messages({
      "string.min": "Phone number must not be less than 10 digits long.",
      "string.max": "Phone number must not be more than 20 digits long.",
      "string.pattern.base": "Phone number must contain only numeric digits.",
      "any.required": "Phone number is required.",
    }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password should be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

// Define the user schema with TypeScript types
const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

// Reusable validation function with explicit types
export const validateUser = (userData: UserInput): ValidationResult => {
  return userSchema.validate(userData, { abortEarly: false });
};

export const validateUserSignIn = (
  userData: UserSignInInput
): ValidationResult => {
  return signInSchema.validate(userData, { abortEarly: false });
};
