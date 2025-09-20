import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./logger.js";

dotenv.config()
//? ! s appellle Non-Null Assertion operator
const MONGO_URI = process.env.MONGO_URI!;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("connected successfuly");
  } catch (error) {
    logger.error("connection error: ", error);

    //? Arrête le serveur si la connexion échoue
    /**
         ** process est un objet global Node.js qui représente le processus en cours
         ** process.exit(code) termine immédiatement le processus avec le code de sortie :
         **  0 → succès
         **   1 (ou autre) → erreur
         */
    process.exit(1);
  }
};
