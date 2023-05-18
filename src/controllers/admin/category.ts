import { NextFunction, Request, Response } from "express";
import { Category, User } from "src/models";
import { createErrorObj, createSuccessObj } from "src/utils";
import { v4 } from "uuid";

interface IcategoryReqBody {
  name: string;
}

export const getCategories = async (
  req: Request<any, any, IcategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const category = await Category.findAll();
    res.json(createSuccessObj(category));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCategory = async (
  req: Request<any, any, IcategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const adminUser = await User.findOne({ where: { id: userId, type: "admin" } });
    if (!adminUser) {
      const err = createErrorObj("Unauthorized", 403);
      throw err;
    }
    const category = Category.build({ id: v4(), name: req.body.name });
    await category.save();
    res.status(200).json(createSuccessObj(category));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editCategory = async (
  req: Request<{ categoryId?: string }, any, IcategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const adminUser = await User.findOne({ where: { id: userId, type: "admin" } });
    if (!adminUser) {
      const err = createErrorObj("Unauthorized", 403);
      throw err;
    }
    await Category.update({ name: req.body.name }, { where: { id: req.params.categoryId } });
    res.status(200).json(createSuccessObj({ name: req.body.name, id: req.params.categoryId }));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCategory = async (
  req: Request<{ categoryId?: string }, any, IcategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const adminUser = await User.findOne({ where: { id: userId, type: "admin" } });
    if (!adminUser) {
      const err = createErrorObj("Unauthorized", 403);
      throw err;
    }
    const response = await Category.destroy({ where: { id: req.params.categoryId } });
    res.status(200).json(createSuccessObj({ no: response }));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
