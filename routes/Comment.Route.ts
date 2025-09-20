import {
  verify_Authorization,
  verifyAuth,
} from "../middlewares/authentification.js";
import {
  VCreateComment,
  VUpdateComment,
} from "../validations/Comment.Validation.js";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/Comment.Controller.js";
import { Router } from "express";
import { validateObjectId } from "../middlewares/validateObjectId.js";
import { zodValidate } from "../middlewares/zodValidate.js";

const CommentRouter = Router();

CommentRouter.route("/").post(
  verifyAuth,
  zodValidate(VCreateComment),
  createComment
);
CommentRouter.route("/:id")
  .put(
    verifyAuth,
    verify_Authorization,
    validateObjectId,
    zodValidate(VUpdateComment),
    updateComment
  )
  .delete(
    verifyAuth, 
    verify_Authorization, 
    validateObjectId, 
    deleteComment
);

export default CommentRouter