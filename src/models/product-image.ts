import { DataTypes, ModelDefined, UUID } from "sequelize";
import { sequelize } from "src/db";

export interface ProductImageAttributes {
  id: string;
  name: string;
  path: string;
  url: string;
  productId: string;
}

export const ProductImage: ModelDefined<ProductImageAttributes, ProductImageAttributes> =
  sequelize.define("product-image", {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
    // productId: {
    //   type: UUID,
    //   allowNull: false,
    // },
  });
