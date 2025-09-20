import { z } from 'zod';

export const VCreatePost = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
//   author: z.string().min(1, "Author is required"), // ObjectId as string
  category: z.string().min(1, "Category is required"), 

});

export const VUpdatePost = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  content: z.string().min(1, "Content is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
});