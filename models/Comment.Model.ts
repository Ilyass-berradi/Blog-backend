import { model, Schema } from "mongoose";
import {type IComment } from "../interfaces/Comment.Interface.js";

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export const Comment = model<IComment>("Comment" , commentSchema)