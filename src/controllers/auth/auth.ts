import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "src/models";
import { createErrorObj, createSuccessObj, deletePropertyFromObject } from "src/utils";
import { v4 } from "uuid";
import { IreqSignin, IreqSignup } from "./type";

dotenv.config();

export const signupUser = async (
  req: Request<{}, {}, IreqSignup>,
  res: Response<{}>,
  next: NextFunction
) => {
  try {
    let validationErrors: any[] = validationResult(req).array();
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
    const userWithoutPassword = deletePropertyFromObject(newUser.dataValues, "password");
    res.status(201).json(createSuccessObj(userWithoutPassword, "User created SuccessFully", 201));
  } catch (error) {
    next(error);
  }
};

export const signinUser = async (
  req: Request<{}, {}, IreqSignin>,
  res: Response<{}>,
  next: NextFunction
) => {
  try {
    let validationErrors: any[] = validationResult(req).array();
    if (validationErrors.length > 0) {
      const err = createErrorObj(validationErrors[0]?.msg);
      err.status = 401;
      throw err;
    }
    const userDetails = { ...req.body };
    const user = await User.scope("includePassword").findOne({
      where: { email: userDetails.email },
    });
    if (!user) {
      const err = createErrorObj("Incorrect email address");
      err.status = 401;
      throw err;
    }
    const isPasswordMatched = await bcrypt.compare(userDetails.password, user.dataValues.password);
    if (!isPasswordMatched) {
      const err = createErrorObj("Incorrect password");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "2d",
      algorithm: "HS256",
    });
    const userWithoutPassword = deletePropertyFromObject(user.dataValues, "password");
    res
      .status(200)
      .json(createSuccessObj({ ...userWithoutPassword, token }, "Successfully logged in", 200));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
