import { Request, Router } from "express";
import multer from "multer";
import { ICreateProductBody, createProduct, editProduct, getProducts } from "src/controllers";
import { isAuth } from "src/middlewares";
import validator from "validator";

const MAX_IMAGE_SIZE = 2_000_000_000;

const validateProductReqBody = (req: Request<any, any, ICreateProductBody>): boolean => {
  try {
    const { description, location, model, name, type } = req.body;
    const isDescriptionValid = validator.isLength(description, { min: 5 });
    const isLocationValid = validator.isLength(location, { min: 2 });
    const isModelValid = validator.isLength(model, { min: 1 });
    const isNameValid = validator.isLength(name, { min: 1 });
    const isTypeValid = validator.equals(type, "new") || validator.equals(type, "used");
    return isDescriptionValid && isLocationValid && isModelValid && isNameValid && isTypeValid;
  } catch (error) {
    return false;
  }
};

const storage = multer.diskStorage({
  destination: "uploads",
  filename(req: Request<{ productId?: string }, any, ICreateProductBody>, file, callback) {
    const validCredentials = validateProductReqBody(req);
    if (!validCredentials) {
      callback(Error("No valid credentials"), "");
      return;
    }

    // IF IT IS A POST REQUEST AND THE TYPE IS NOT IMAGE THROW AN ERROR
    if (
      !file.mimetype.includes("image") &&
      !req.params.productId &&
      req.method.toLocaleLowerCase() === "post"
    ) {
      callback(Error("File Type must be an image"), "");
      return;
    }

    // IF IT IS A PUT REQUEST AND THERE IS A FILE BUT THE TYPE IS NOT IMAGE
    if (
      req.params.productId &&
      req.method.toLocaleLowerCase() === "put" &&
      file &&
      !file.mimetype.includes("image")
    ) {
      callback(Error("File Type must be an image"), "");
      return;
    }

    callback(null, `${Date.now().toString(36)}_${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: MAX_IMAGE_SIZE } });

const router = Router();

router.get("/", getProducts);

router.post("/create", isAuth, upload.single("image"), createProduct);

router.put("/edit/:productId", isAuth, upload.single("image"), editProduct);

const productRoutes = router;
export default productRoutes;
