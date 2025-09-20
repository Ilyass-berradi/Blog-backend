import { z } from 'zod';
export const VCreateComment = z.object({
  content: z.string()
    .min(1, "Content is required")
    .max(1000, "Content too long (max 1000 characters)")
    .trim(),
  post: z.string()
    .min(1, "Post ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID format"),
});

export const VUpdateComment = z.object({
  content: z.string()
    .min(1, "Content is required")
    .max(1000, "Content too long (max 1000 characters)")
    .trim(),
});

