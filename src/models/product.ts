import { CHAR, INTEGER, ModelDefined, Optional, STRING } from "sequelize";
import { sequelize } from "src/db";

export interface ProductAttributes {
  id: string;
  name: string;
  model: string;
  location: string;
  quantity: number;
  type: "used" | "new";
  description: string;
  userId: string;
}

export const Product: ModelDefined<
  ProductAttributes,
  Optional<ProductAttributes, "location">
> = sequelize.define("product", {
  id: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  model: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: CHAR,
    allowNull: false,
  },
  location: {
    type: STRING,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  // userId: {
  //   type: UUID,
  //   allowNull: false,
  // },
});
