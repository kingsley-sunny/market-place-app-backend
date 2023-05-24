import { Router } from "express";
import { addToCart } from "src/controllers/cart/cart";

const router = Router();

router.post("/add", addToCart);

export const cartRoutes = router;
