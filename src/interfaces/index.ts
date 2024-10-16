export interface UserInput {
  [x: string]: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: string
}

export interface UserSignInInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  email: string;
}
