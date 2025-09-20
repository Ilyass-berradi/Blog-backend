import { Schema, model } from "mongoose";
import {type ICategory } from "../interfaces/Category.Inteface.js";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },

},
{collection : "Category"});

const Category = model<ICategory>("Category", categorySchema);
export default Category;
