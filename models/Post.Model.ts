import mongoose, { Schema, Model } from "mongoose";
import {type IPostDocument } from "../interfaces/Post.Interface.js";



const PostSchema: Schema<IPostDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    likes :{
      type : Number,
      default : 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


PostSchema.virtual("comment" , {
  ref: "Comment",
  foreignField : "post",
  localField: "_id"
})


const Post: Model<IPostDocument> = mongoose.model<IPostDocument>("Post", PostSchema);
export default Post;
