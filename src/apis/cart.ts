import { Router } from "express";
import { addToCart, getCartItems, removeItemFromCart } from "src/controllers/cart/cart";

const router = Router();

router.post("/add", addToCart);

router.delete("/remove/:productId", removeItemFromCart);

router.get("/", getCartItems);

export const cartRoutes = router;
