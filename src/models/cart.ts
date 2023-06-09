import { INTEGER, ModelDefined, Optional, UUID } from "sequelize";
import { sequelize } from "src/db";

export interface CartAttributes {
  id?: number;
  uuid: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const Cart: ModelDefined<
  CartAttributes,
  Optional<CartAttributes, "updatedAt">
> = sequelize.define("cart", {
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
  userId: {
    type: INTEGER,
    allowNull: false,
  },
});
