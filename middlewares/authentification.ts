import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type IUserJwtPayload } from "../interfaces/Auth.Interface.js";

// // chaque Request d’Express peut avoir une propriété optionnelle user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUserJwtPayload;
//     }
//   }
// }

const JWT_SECRET = process.env.JWT_SECRET;

//! verify token
export const verifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    req.user = decoded as IUserJwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};

//! verify token and user
export const onlyUser = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  verifyAuth(req, res, () => {
    if (req.user && req.user.id == req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "not allowes , only user" });
    }
  });
};

//! verify token and admin

export const verifyAuth_Admin = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  verifyAuth(req, res, () => {
    if (req.user?.role == "admin") {
      next();
    } else {
      return res.status(403).json({ message: "not allowes , only admin" });
    }
  });
};

//! admin and user

export const verify_Authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyAuth(req, res, () => {
    if (req.user?.id === req.params.id || req.user?.role == "admin") {
      next();
    } else {
      return res.status(403).json({ message: "only user or admin" });
    }
  });
};
