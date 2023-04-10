import { NextFunction, Request, Response } from "express";
import { Product, ProductImage, ProductImageAttributes, User } from "src/models";
import { createErrorObj, createSuccessObj, deleteFile } from "src/utils";
import { v4 } from "uuid";
import { ICreateProductBody, IEditProductParams } from "./types";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll({ include: "product-image" });

    res.json(createSuccessObj(products));
  } catch (error: any) {
    console.log(error);
    next(createErrorObj(error.message));
  }
};

export const createProduct = async (
  req: Request<any, any, ICreateProductBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      const err = createErrorObj("No User found");
      err.status = 401;
      throw err;
    }

    if (!req.file) {
      const err = createErrorObj("No Image found");
      err.status = 401;
      throw err;
    }
    const product = await user.createProduct({ ...req.body, id: v4() });
    const image = await ProductImage.create({
      id: v4(),
      name: req.file?.originalname,
      path: req.file?.path,
      url: req.file?.filename,
      productId: product.dataValues.id,
    });
    await image.save();

    res.status(201).json(createSuccessObj({ ...product.dataValues, image: image.dataValues }));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editProduct = async (
  req: Request<IEditProductParams, any, Omit<ICreateProductBody, "userId">>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId, userId: req.userId },
      include: "product-image",
    });
    if (!product) {
      const err = createErrorObj("No Product found");
      err.status = 401;
      throw err;
    }

    await product.update(req.body);
    let image: ProductImageAttributes = (product as any)["product-image"];
    const oldImageFilePath = image.path;

    if (req.file) {
      image.name = req.file.originalname;
      image.path = req.file.path;
      image.url = req.file.filename;
      await ProductImage.update(
        { name: image.name, path: image.path, url: image.url },
        { where: { id: image.id } }
      );
      deleteFile(oldImageFilePath);
    }

    res.status(201).json(createSuccessObj(product));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
