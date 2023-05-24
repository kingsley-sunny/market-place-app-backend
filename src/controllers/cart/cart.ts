import { NextFunction, Request, Response } from "express";
import { Cart } from "src/models/cart";
import { CartItems } from "src/models/cart-items";
import { createErrorObj, createSuccessObj } from "src/utils";
import { v4 } from "uuid";

export const addToCart = async (
  req: Request<any, any, CartBody>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const productId = req.body.productId;
    const userId = req.userId;
    const cart = await Cart.findOne({ where: { userId: userId } });

    if (!cart) {
      const err = createErrorObj("No Cart found");
      err.status = 401;
      throw err;
    }

    // we check if the productId is already in the cart.
    const cartItem = await CartItems.findOne({
      where: { productId: productId, cartId: cart.dataValues.id },
    });

    console.log(cartItem);

    if (!cartItem) {
      // if it is NOT in the cart we will add the product and the make the quantity to 1
      const newCartItem = CartItems.build({
        productId,
        quantity: 1,
        uuid: v4(),
        cartId: cart.dataValues.id,
      });
      console.log("hello");

      await newCartItem.save();
      return res.status(201).json(createSuccessObj(newCartItem, "SuccessFul", 201));
    }

    // else if it is in the cart increase the quantity
    const newCartItem = { ...cartItem.dataValues };
    newCartItem.quantity += 1;
    cartItem.update({ quantity: newCartItem.quantity });
    res.status(201).json(createSuccessObj(cartItem, "SuccessFul", 201));
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
