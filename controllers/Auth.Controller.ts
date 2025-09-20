import { type Request, type Response, type NextFunction } from "express";
import User from "../models/Users.Model.js";
import bcrypt from "bcrypt";
import type {CreateUser, LoginUser} from "../interfaces/Auth.Interface.js"
import type { IUser } from "../interfaces/User.Interface.js";
import  {generateToken} from "../utils/jwt.js"


if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

type CreateUserRequest = Request<{}, {}, CreateUser>;
export const registerUser = async (
  req: CreateUserRequest,
  res: Response,
  next: NextFunction
): Promise < void | Response>  => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(201).json({ message: "User created successfully", userWithoutPassword });
  } catch (error) {
    // return res.status(500).json({ message: "Server error", error });
    next(error);
  }
};

type LoginUserRequest = Request<{}, {}, LoginUser>;
export const loginUser = async (
  req: LoginUserRequest,
  res: Response,
  next: NextFunction
) : Promise < void | Response> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch : boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // const token = jwt.sign(
    //   { id: user._id, name: user.username, role: user.role, email: user.email },
    //   JWT_SECRET!,
    //   {
    //     expiresIn: "1h",
    //   }
    // );
    const token = generateToken({ id: user._id, name: user.username, role: user.role, email: user.email })

    res.cookie("token" , token , {
      httpOnly : true ,
      sameSite : "strict",
      maxAge: 60*60*1000
    })
    return res.status(200).json({
      message: "Login successful",
      data: {
        token,
        id: user._id,
        role: user.role,
        name: user.username,
      },
    });
  } catch (error) {
    // return res.status(500).json({ message: "Server error", error });
    next(error);
  }
};


// todo refresh token
