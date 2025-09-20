
import rateLimit from "express-rate-limit";


export const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  //   message: "trop de requetes , réessayez plus tard",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Vous avez dépassé la limite de requetes ",
    });
  },
});
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  //   message: "Trop de tentatives de connexion, réessayez plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Vous avez dépassé la limite de requetes ",
    });
  },
});
