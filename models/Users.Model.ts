
import mongoose, { Schema, Model } from "mongoose";
import type { IUser } from "../interfaces/User.Interface.js"

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , select : false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // todo posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
