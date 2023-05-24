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

export const removeItemFromCart = async (
  req: Request<CartBody, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const productId = req.params.productId;
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

    // If it is not in the cart, we will send back an error message that the product is not found
    if (!cartItem) {
      const err = createErrorObj("This Product is not in the cart");
      err.status = 400;
      throw err;
    }

    // If it is in the cart and the quantity is higher than 1, we will reduce it
    if (cartItem.dataValues.quantity > 1) {
      const newCartItem = { ...cartItem.dataValues };
      newCartItem.quantity -= 1;
      cartItem.update({ quantity: newCartItem.quantity });
      return res.status(201).json(createSuccessObj({}, "SuccessFul", 201));
    }

    // but if it is lesser than 1, we will remove the entire item from the cart
    if (cartItem.dataValues.quantity <= 1) {
      cartItem.destroy();
      return res
        .status(201)
        .json(createSuccessObj({}, "SuccessFul Removed Item from the cart", 201));
    }
  } catch (error) {
    next(error);
  }
};

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.userId;
  const cartItems = await CartItems.findAll({ where: { cartId: userId } });

  res.status(200).json(createSuccessObj(cartItems));
};
