import { Router } from "express";
import multer from "multer";
import { createProduct } from "../controllers/product/product";
import { isAuth } from "../middlewares/is-auth";

const upload = multer({ dest: "src/uploads/product-images" });

const router = Router();

router.post("/create", isAuth, createProduct);

const productRoutes = router;
export default productRoutes;
