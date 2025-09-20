import { Document , Types } from "mongoose";
export interface IPost {
  title: string;
  content: string;
  image : string ;
  author: Types.ObjectId;
  likes?: number;
  category : Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost , Document{}