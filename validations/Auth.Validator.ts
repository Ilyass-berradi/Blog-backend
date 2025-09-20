import { z } from "zod";


export const loginSchema = z.object({
  email: z.string({ message: "L'email est requis" }).email("Invalid email"),
  password: z.string({ message: "Le mot de passe est requis" }).min(6, "Password must be at least 6 characters"),
}).strict();

export const VCreateUser = z.object({
  username: z.string({ message: "Le nom est requis" }).min(3, "Username must be at least 3 characters"),
  email: z.string({ message: "L'email est requis" }).email( "Invalid email" ),
  password: z.string({ message: "Le mot de passe est requis" }).min(6, "Password must be at least 6 characters"),
});