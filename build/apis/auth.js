import { Router } from "express";
import { signupUser } from "../controllers/auth.js";
var router = Router();
router.post("/signup", signupUser);
