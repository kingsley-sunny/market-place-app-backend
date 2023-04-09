import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../db/db";

export interface ProductImageAttributes {
  name: string;
  path: string;
  url: string;
}

const ProductImage: ModelDefined<ProductImageAttributes, ProductImageAttributes> = sequelize.define(
  "product-image",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

export default ProductImage;
