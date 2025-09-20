import { type Request, type Response, type NextFunction } from "express";
import { ZodType } from "zod";

type AnyZodeSchema = ZodType<any, any>;

export const zodValidate =
  (schema: AnyZodeSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationData = {
        ...req.body,
        // Si vous avez besoin de valider le fichier, ajoutez-le ici
        ...(req.file && { image: req.file }),
      };

      console.log("Data to validate:", validationData);

      // Validation avec Zod
      await schema.parseAsync(validationData);
      next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        // errors: error.errors.map((e: any) => e.message),
        error,
      });
    }
  };

/**
   * Output → le type attendu après validation (ce que ton programme va manipuler si la validation réussit).

    Def → la définition interne du schéma (c’est là où Zod garde tes règles .min(), .max(), .email(), etc. → tu n’as pas besoin de le gérer directement).

    Input → le type des données avant validation (ce que tu reçois de l’extérieur → généralement unknown ou any, car ça peut venir d’un body, query, etc.).
   */
