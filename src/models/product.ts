import { CHAR, ENUM, INTEGER, ModelDefined, Optional, STRING, UUID } from "sequelize";
import { sequelize } from "src/db";

export interface ProductAttributes {
  id?: string;
  uuid: string;
  name: string;
  model: string;
  location: string;
  quantity: number;
  type: "USED" | "NEW";
  description: string;
  price: number;
  userId?: string;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const Product: ModelDefined<
  ProductAttributes,
  Optional<ProductAttributes, "location">
> = sequelize.define(
  "product",
  {
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
      type: STRING,
      allowNull: false,
    },
    model: {
      type: STRING,
      allowNull: false,
    },
    type: {
      type: ENUM("USED", "NEW"),
      allowNull: false,
    },
    description: {
      type: CHAR,
      allowNull: false,
    },
    price: {
      type: INTEGER,
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
  },
  {
    indexes: [
      {
        type: "FULLTEXT",
        fields: ["name", "location"],
      },
    ],
  }
);
