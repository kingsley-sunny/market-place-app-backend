import { Router } from "express";
import { body } from "express-validator";
import { signinUser, signupUser } from "../controllers/auth/auth.js";

const router = Router();

router.post(
  "/signup",
  [
    body("email", "Email must be a valid email address").trim().toLowerCase().isEmail(),
    body(["firstname", "lastname"], "First name or Last name must be greater than 3 characters")
      .trim()
      .isLength({ min: 3, max: 50 }),
    body("password", "Password should be greater than 5 characters").isLength({ min: 5 }),
  ],
  signupUser
);

router.post(
  "/signin",
  [
    body("email", "Email must be a valid email address").trim().toLowerCase().isEmail(),
    body("password", "Password should be greater than 5 characters").isLength({ min: 5 }),
  ],
  signinUser
);

const authRoutes = router;
export default authRoutes;
