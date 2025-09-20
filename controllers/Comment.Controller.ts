import { type NextFunction, type Request, type Response } from "express";
import { Comment } from "../models/Comment.Model.js";
import { type IComment } from "../interfaces/Comment.Interface.js";
import Post from "../models/Post.Model.js";

type CommentRequest = Request<{}, {}, IComment>;


export const createComment = async (
  req: CommentRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { content, post } = req.body;
    const author = req.user?.id;

    const postExists = await Post.findById(post);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      author,
      post,
    });

    await comment.populate("author", "username email");
    
    return res.status(201).json({
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    next(error);
  }
};


export const getCommentsByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { postId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ post: postId });

    return res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalComments: total,
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    next(error);
  }
};


export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user?.id) {
      return res.status(403).json({ 
        message: "Access denied. You can only update your own comments" 
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    ).populate("author", "username email");

    return res.status(200).json({
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    next(error);
  }
};


export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

  
    if (req.user?.role !== "admin" && comment.author.toString() !== req.user?.id) {
      return res.status(403).json({ 
        message: "Access denied. You can only delete your own comments" 
      });
    }

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    next(error);
  }
};
