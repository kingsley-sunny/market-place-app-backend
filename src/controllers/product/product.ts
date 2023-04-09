import { NextFunction, Request, Response } from "express";
import { ICreateProductBody } from "./types";

export const createProduct = (
  req: Request<any, ICreateProductBody, ICreateProductBody>,
  res: Response,
  next: NextFunction
) => {
  res.json({ id: req.userId });
  // req.body.
};
