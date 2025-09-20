import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/Db.Configue.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import logger from "./config/logger.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


import AuthRouter from "./routes/Auth.Route.js"
import CategoryRouter from "./routes/Category.Route.js";
import PostRouter from "./routes/Post.Route.js";
import CommentRouter from "./routes/Comment.Route.js";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour form-data


const PORT = process.env.PORT;

// Rate limiter
app.use(globalLimiter);

// Cookie parser
app.use(cookieParser());

// Servir les fichiers statiques (IMPORTANT pour les images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logger pour les requêtes HTTP
app.use(morgan("dev"));
app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.info(msg.trim())
    }
  })
);

// Routes
app.use("/auth", AuthRouter);
app.use("/category", CategoryRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter );

// Middleware d'erreurs
app.use(errorHandler);

// Connection avec mongodb et démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});