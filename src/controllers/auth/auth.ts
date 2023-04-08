import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 } from "uuid";
import User from "../../models/user.js";
import { createErrorObj } from "../../utils/functions.js";
import { IreqSignup } from "./type.js";

export const signupUser = async (
  req: Request<{}, {}, IreqSignup>,
  res: Response<{}>,
  next: NextFunction
) => {
  try {
    let validationErrors = validationResult(req).array();
    if (validationErrors.length > 0) {
      const err = createErrorObj(validationErrors[0].msg);
      err.status = 401;
      throw err;
    }

    const userDetails = { ...req.body };
    const user = await User.findOne({ where: { email: userDetails.email } });
    if (user) {
      const err = createErrorObj("user is already present");
      err.status = 401;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);
    userDetails.password = hashedPassword;
    const newUser = User.build({ ...userDetails, id: v4() });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
