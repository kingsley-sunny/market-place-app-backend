import { INTEGER, ModelDefined, Optional, UUID } from "sequelize";
import { sequelize } from "src/db";

export interface CartItemAttributes {
  id?: number;
  uuid: string;
  cartId?: string;
  productId: number;
  createdAt?: string;
  updatedAt?: string;
}

export const CartItems: ModelDefined<
  CartItemAttributes,
  Optional<CartItemAttributes, "updatedAt">
> = sequelize.define("cart-items", {
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
  productId: {
    type: INTEGER,
    allowNull: false,
  },
  cartId: {
    type: INTEGER,
    allowNull: false,
  },
});
