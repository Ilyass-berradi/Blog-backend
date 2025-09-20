import { Router } from "express";
import { zodValidate } from "../middlewares/zodValidate.js";
import {createCategorySchema} from "../validations/Category.Validator.js"
import { createCategory, DeleteCategory, getAllCategory } from "../controllers/Category.Controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";
import {verifyAuth_Admin} from "../middlewares/authentification.js"
const CategoryRouter = Router()

CategoryRouter.post("/",verifyAuth_Admin  ,zodValidate(createCategorySchema) , createCategory)
CategoryRouter.get("/" , getAllCategory)
CategoryRouter.delete("/:id", verifyAuth_Admin ,validateObjectId  , DeleteCategory)

export default CategoryRouter