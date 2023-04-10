import { Router } from "express";
import { createCategory, getCategories } from "src/controllers";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories/create", createCategory);

export const adminRoutes = router;
