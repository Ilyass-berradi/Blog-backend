import { Router } from "express";
import { zodValidate } from "../middlewares/zodValidate.js";
import { verify_Authorization, verifyAuth } from "../middlewares/authentification.js";
import { VCreatePost, VUpdatePost } from "../validations/Post.Validation.js";
import { CreatePosts, DeletePosts, GetAllPosts, GetPost, updateImage, UpdatePosts } from "../controllers/Post.Controller.js";
import upload from "../utils/upload.js"

const PostRoute = Router()

PostRoute.route("/").post(verifyAuth  ,upload.single("image") , zodValidate(VCreatePost)  , CreatePosts)
.get(GetAllPosts)

PostRoute.route("/:id")
.get(GetPost)
.delete(verify_Authorization , DeletePosts)
.put(verify_Authorization , zodValidate(VUpdatePost) , UpdatePosts)

PostRoute.put("/image/:id" , verify_Authorization , upload.single("image") , updateImage)

export default PostRoute