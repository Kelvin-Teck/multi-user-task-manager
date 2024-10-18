import Joi, { ValidationResult } from "joi";
import {
  FilterTasksByTagInterface,
  ModifyTaskStatusInterface,
  TaskAssignmentInterface,
  TaskInterface,
  UserSignInInput,
  UserSinUpInput,
} from "@interfaces";

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
  role: Joi.string()
    .valid("admin", "user")
    .optional()
    .default("user")
    .messages({
      "any.only": "Role must be either 'admin' or 'user'",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

// Define the signIn schema with TypeScript types
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

// Define Task Schema
const taskSchema = Joi.object({
  title: Joi.string().required().min(1).max(255).messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title must be less than or equal to 255 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().optional().allow("").max(1000).messages({
    "string.max": "Description must be less than or equal to 1000 characters",
  }),

  dueDate: Joi.date().optional().messages({
    "date.base": "Due date must be a valid date",
  }),

  status: Joi.string()
    .valid("to-do", "in-progress", "completed")
    .optional()
    .default("to-do") // Set default value if not provided
    .messages({
      "any.only":
        "Status must be one of the following: to-do, in-progress, completed",
    }),
  tag: Joi.string()
    .valid("urgent", "bug", "feature")
    .optional()
    .default("feature") // Set default value if not provided
    .messages({
      "any.only":
        "Tag must be one of the following: to-do, in-progress, completed",
    }),

  userId: Joi.string()
    .guid({ version: ["uuidv4"] }) // Validate as UUID v4
    .required()
    .messages({
      "string.guid": "User ID must be a valid UUID",
      "any.required": "User ID is required",
    }),
});

// assign Task Schema
export const assignTaskValidationSchema = Joi.object({
  taskId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.empty": "Task ID is required",
      "string.guid": "Task ID must be a valid UUID",
    }),

  assigneeId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.empty": "Assignee ID is required",
      "string.guid": "Assignee ID must be a valid UUID",
    }),
});

export const modifyTaskStatusSchema = Joi.object({
  status: Joi.number().required(),
});

export const filterTasksByTagSchema = Joi.object({
  tagName: Joi.string().valid("urgent", "bug", "feature").required(),
});

// Reusable validation function with explicit types

// Users Validation
export const validateUserSignUp = (
  userData: UserSinUpInput
): ValidationResult => {
  return userSchema.validate(userData, { abortEarly: false });
};

export const validateUserSignIn = (
  userData: UserSignInInput
): ValidationResult => {
  return signInSchema.validate(userData, { abortEarly: false });
};

//Task Validations

export const validateTaskInput = (
  userData: TaskInterface
): ValidationResult => {
  return taskSchema.validate(userData, { abortEarly: false });
};

export const validateTaskAssignmentInput = (
  userData: TaskAssignmentInterface
): ValidationResult => {
  return assignTaskValidationSchema.validate(userData, { abortEarly: false });
};

export const validateModifyTaskStatusEntry = (
  userData: ModifyTaskStatusInterface
): ValidationResult => {
  return modifyTaskStatusSchema.validate(userData, { abortEarly: false });
};
export const validateFilterTasksByTagEntry = (
  userData: FilterTasksByTagInterface
): ValidationResult => {
  return filterTasksByTagSchema.validate(userData, { abortEarly: false });
};

// Admin validation
export const validateNewAdminEntry = (
  userData: UserSignInInput
): ValidationResult => {
  return signInSchema.validate(userData, { abortEarly: false });
};
