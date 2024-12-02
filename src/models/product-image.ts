import { DataTypes, INTEGER, ModelDefined, UUID } from "sequelize";
import { sequelize } from "src/db";

export interface ProductImageAttributes {
  id?: string;
  uuid: string;
  name: string;
  path: string;
  url: string;
  productId: number;
}

export const ProductImage: ModelDefined<ProductImageAttributes, ProductImageAttributes> =
  sequelize.define("product-image", {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    uuid: {
      type: UUID,
      allowNull: false,
    },
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
    productId: {
      type: INTEGER,
      allowNull: false,
    },
  });
