import { JwtPayload } from "jsonwebtoken";


export interface UserInterface {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'admin' | 'user'
}
export interface UserSinUpInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}


export interface UserSignInInput {
  email: string;
  password: string;
}

export interface JwtSignPayload {
  id: string;
  email: string;
  role: string;
}

export interface CustomJwtPayload extends JwtPayload {
  exp?: number;
  role: 'admin' | 'user'
}

export interface TaskInterface {
  readonly id?: string;
  title: string;
  description: string;
  dueDate: string;
  status?: 'to-do' | 'in-progress' | 'completed';
  userId?: string;
}

export interface TaskAssignmentInterface{
  taskId: string;
  assigneeId: string;
}