import { NextFunction, Request, Response, Router } from "express";
import { isAuth } from "../../middlewares/is-auth.js";

const router = Router();

router.get("/", isAuth, (req: Request, res: Response, next: NextFunction) => {
  res.json({ id: req.userId });
});

const productRoutes = router;
export default productRoutes;
