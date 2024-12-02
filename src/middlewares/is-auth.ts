import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createErrorObj } from "src/utils";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      const err = createErrorObj("Unauthorized", 401);
      throw err;
    }
    const userDetails = verify(token, process.env.JWT_PRIVATE_KEY, {
      algorithms: ["HS256"],
    }) as any;

    if (userDetails?.id) {
      throw new Error("Error validating user");
    }
    req.userId = userDetails.id;
    console.log(req.userId, userDetails);

    next();
  } catch (error: any) {
    next(error);
  }
};
