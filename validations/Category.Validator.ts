import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({ message: "Le nom de la catégorie est requis" })
    .min(1, "Le nom de la catégorie ne peut pas être vide")
    .max(50, "Le nom est trop long"), 
});
