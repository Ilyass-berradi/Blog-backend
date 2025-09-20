
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/Auth.Controller.js";
import { zodValidate } from "../middlewares/zodValidate.js";
import { VCreateUser , loginSchema } from "../validations/Auth.Validator.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";
const AuthRouter = Router();


AuthRouter.post("/register", zodValidate(VCreateUser) ,registerUser);
AuthRouter.post("/login", loginLimiter,zodValidate(loginSchema) ,loginUser);

export default AuthRouter;
