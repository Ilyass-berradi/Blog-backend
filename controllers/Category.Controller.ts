import  Category  from "../models/Category.Model.js";
import { type NextFunction, type Request, type Response } from "express";
import { type ICategory } from "../interfaces/Category.Inteface.js";

type CategoryRequest = Request<{}, {}, ICategory>;

export const createCategory = async (
  req: CategoryRequest,
  res: Response,
  next: NextFunction
) : Promise<Response | void> => {
  try {
    const { name } = req.body;
    const findName = await Category.findOne({name})
    if (findName) {
        return res.status(409).json({message : " category already exist"})
    }
    const cat = await Category.create({ name });
    return res
      .status(201)
      .json({ message: "Category created successfully", data: cat });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<Response | void> => {
  try {
    const categorys = await Category.find();
    res
      .status(200)
      .json({ message: "category fetched successfully", data: categorys });
  } catch (error) {
    next(error);
  }
};

export const DeleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<Response | void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "category has been deleted successfully"})
  } catch (error) {
    next(error);
  }
};
