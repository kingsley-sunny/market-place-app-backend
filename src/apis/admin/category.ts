import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategories } from "src/controllers";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories/create", createCategory);

router.put("/categories/:categoryId", editCategory);

router.delete("/categories/:categoryId", deleteCategory);

export const adminRoutes = router;
