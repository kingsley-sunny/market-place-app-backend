import { Router } from "express";
import {
  addToCart,
  clearAllCart,
  getCartItems,
  removeItemFromCart,
} from "src/controllers/cart/cart";

const router = Router();

router.post("/add", addToCart);

router.delete("/remove/:productId", removeItemFromCart);

router.get("/", getCartItems);

router.delete("/clear", clearAllCart);

export const cartRoutes = router;
