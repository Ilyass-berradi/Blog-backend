import {type NextFunction,type Request,type Response } from "express";
import { Types } from "mongoose";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!Types.ObjectId.isValid(req.params.id!)) {
    return res.status(400).json({ message: "invalid id" });
  }
  next();
};
