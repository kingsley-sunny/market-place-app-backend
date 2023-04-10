import { ProductAttributes } from "src/models";

export interface ICreateProductBody extends Omit<ProductAttributes, "id"> {
  image: Express.Multer.File;
}

export interface IEditProductParams {
  productId?: string;
}
