import { Router } from "express";
import { body } from "express-validator";
import { signupUser } from "../../controllers/auth/auth.js";
var router = Router();
router.post("/signup", [
    body("email", "Email must be a valid email address").trim().toLowerCase().isEmail(),
    body(["firstname", "lastname"], "First name or Last name must be greater than 3 characters")
        .trim()
        .isLength({ min: 3, max: 50 }),
    body("password", "Password should be greater than 5 characters").isLength({ min: 5 }),
], signupUser);
var authRoutes = router;
export default authRoutes;
