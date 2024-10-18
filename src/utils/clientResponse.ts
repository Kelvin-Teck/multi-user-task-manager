import { CustomError } from "@errors/customError";


/*Helper Functions For Sending Response To the Client*/
 
export const sendError = (
  message: string,
  code: number
): {
  status: string;
  code: number;
  message: string;
} => {
  var error = {
    status: "ERROR",
    code: code,
    message: message,
  };

  return error;
};

export const sendSuccess = (message: string, data: any | null) => {
  var success = {
    status: "SUCCESS",
    code: 200,
    message: message,
    data: data,
  };

  return success;
};

export const newError = (message: string, code: number): never => {
  
  throw new CustomError(message, code);
};