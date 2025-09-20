import type { JwtPayload } from "jsonwebtoken";

export interface CreateUser {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
export interface LoginUser {
  readonly email: string;
  readonly password: string;
}

export interface IUserJwtPayload extends JwtPayload {
  id: string;
  name: string;
  role: string;
  email: string;
}
