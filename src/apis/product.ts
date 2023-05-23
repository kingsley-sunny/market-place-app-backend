import { Request, Router } from "express";
import multer from "multer";
import {
  ICreateProductBody,
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "src/controllers";
import { isAuth } from "src/middlewares";
import validator from "validator";

const MAX_IMAGE_SIZE = 2_000_000_000;

const validateProductReqBody = (
  req: Request<any, any, ICreateProductBody>
): { success: boolean; msg: string } => {
  const { description, location, model, name, type, price } = req.body;

  const errorMsg = { success: false, msg: "NO valid credentials" };

  const isDescriptionValid = validator.isLength(description, { min: 5 });

  const isLocationValid = validator.isLength(location, { min: 1 });

  const isModelValid = validator.isLength(model, { min: 1 });

  const isNameValid = validator.isLength(name, { min: 1 });
  const isPriceValid = price > 0;
  const isTypeValid = validator.equals(type, "new") || validator.equals(type, "used");

  if (!isDescriptionValid) {
    errorMsg.msg = "Description Must be Greater 5 characters";
    return errorMsg;
  }

  if (!isLocationValid) {
    errorMsg.msg = "Please Fill in your location";
    return errorMsg;
  }

  if (!isModelValid) {
    errorMsg.msg = "Product Model is required";
    return errorMsg;
  }

  if (!isNameValid) {
    errorMsg.msg = "Product Name is required";
    return errorMsg;
  }

  if (!isPriceValid) {
    errorMsg.msg = "Product price cannot be zero";
    return errorMsg;
  }

  if (!isTypeValid) {
    errorMsg.msg = "Product Type should be used or new";
    return errorMsg;
  }

  return { success: true, msg: "success" };
};

const storage = multer.diskStorage({
  destination: "uploads",
  filename(req: Request<{ productId?: string }, any, ICreateProductBody>, file, callback) {
    const validCredentials = validateProductReqBody(req);
    if (!validCredentials.success) {
      callback(Error(validCredentials.msg), "");
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

router.get("/:productId", getProduct);

router.post("/create", isAuth, upload.single("image"), createProduct);

router.put("/edit/:productId", isAuth, upload.single("image"), editProduct);

router.delete("/delete/:productId", isAuth, deleteProduct);

export const productRoutes = router;
