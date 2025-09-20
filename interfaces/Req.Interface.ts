// src/types/express.d.ts
import { type Request } from "express";
import type { IUserJwtPayload } from "./Auth.Interface.js";
import type * as Multer from "multer";
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      user?: IUserJwtPayload;
    }
  }
}
