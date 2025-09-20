import { type Request, type Response, type NextFunction } from "express";
import logger from "../config/logger.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in mid err")
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(err.status || 500).json({
    message: err.message || "internal server error",
  });
};
