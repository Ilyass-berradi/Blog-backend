
import { type NextFunction, type Request, type Response } from "express";
import Post from "../models/Post.Model.js";
import {type IPost,type IPostDocument } from "../interfaces/Post.Interface.js";
import path, { dirname } from "path";
import { Comment } from "../models/Comment.Model.js";
import fs from "fs";
import logger from "../config/logger.js";
import { fileURLToPath } from "url";

type post = Request<{}, {}, IPost>;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CreatePosts = async (
  req: post,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image: string = req.file.filename;
    const { title, content, author, category } = req.body;

    
    if (!title || !content  || !category) {
      return res.status(400).json({
        message: "Title, content, author, and category are required",
      });
    }

    console.log("Creating post with data:", {
      title,
      content,
      image,
      category,
    });

    const post: IPostDocument = await Post.create({
      title,
      content,
      image,
      author :req.user?.id,
      category,
    });

    return res
      .status(201)
      .json({ message: "Post created successfully", data: post });
  } catch (error) {
    console.error("Error in CreatePosts:", error);
    next(error);
  }
};

export const UpdatePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { title, content, category } = req.body;
    const post: IPostDocument | null = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (req.user?.id !== post.author.toString()) {
      return res
        .status(403)
        .json({ message: "access denied , you are not allowed" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          content,
          category,
        },
      },
      { new: true }
    ).populate("author", "name email");
    res
      .status(200)
      .json({ message: "post updated successfully", data: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const DeletePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const post: IPostDocument | null = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (req.user?.role == "admin" || req.user?.id == post.author.toString()) {
      if (post.image) {
        const imagePath: string = path.join(
          __dirname,
          `../uploads/`,
          post.image
        );
        fs.unlink(imagePath, (err) => {
          if (err) {
            logger.error(
              "Erreur lors de la suppression de l'image:",
              err.message
            );
          }
        });
      }
      await Post.findByIdAndDelete(req.params.id);
      await Comment.deleteMany({ post: post._id });
      res.status(200).json({
        message: "post has been deleted successfully",
      });
    } else {
      return res.status(403).json({ message: "access denied" });
    }
  } catch (error) {
    next(error);
  }
};


export const GetAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const POST_PER_PAGE: number = 6;
    const { pageNumber, category } = req.query;
    let posts: IPostDocument[] = [];

    console.log("Query params:", { pageNumber, category });

    if (category) {
      
      const page = pageNumber ? Number(pageNumber) : 1;
      posts = await Post.find({ category })
        .skip((page - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("author", "username email")
        .populate("category", "name")
        .populate({
          path: "comment",
          populate: {
            path: "author",
            select: "username",
          },
        });
    } else if (pageNumber) {
     
      posts = await Post.find()
        .skip((Number(pageNumber) - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("author", "username email")
        .populate("category", "name")
        .populate({
          path: "comment",
          populate: {
            path: "author",
            select: "username",
          },
        });
    } else {
     
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("author", "username email")
        .populate("category", "name")
        .populate({
          path: "comment",
          populate: {
            path: "author",
            select: "username",
          },
        });
    }

    

    
    const safePosts = posts || [];

    res.status(200).json({
      message: "posts fetched successfully",
      data: safePosts,
      total: safePosts.length,
    });
  } catch (error) {
    console.error("Error in GetAllPosts:", error);
    next(error);
  }
};

export const GetPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("category", "name")
      .populate({
        path: "comment",
        populate: {
          path: "author",
          select: "name",
        },
      });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json({ message: "post fetched successfully", data: post });
  } catch (error) {
    console.error("Error in GetPost:", error);
    next(error);
  }
};

export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (req.user?.id !== post.author?.toString()) {
      return res
        .status(403)
        .json({ message: "access denied , you are not allowed" });
    }

    if (post.image) {
      const oldImagePath = path.join(__dirname, "..", "uploads", post.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    post.image = req.file.filename;
    await post.save();
    res.status(200).json({
      message: "image updated successfully",
      post,
    });
  } catch (error) {
    console.error("Error in updateImage:", error);
    next(error);
  }
};
