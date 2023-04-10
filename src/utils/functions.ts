import { unlink } from "fs";
import type { IAnyObjectType } from "./types";

export const createSuccessObj = <T = any>(data: T, message?: string, status: number = 200) => {
  return { status, message, data, success: true };
};

export const createErrorObj = (message?: string, status: number = 500) => {
  const err = new Error(message);
  return { status, message: err.message, error: true };
};

export const deletePropertyFromObject = <T extends IAnyObjectType>(
  object: T,
  property: keyof T
): T => {
  if (typeof object === "object" && object) {
    if (object.hasOwnProperty(property)) {
      delete object[property];
      const newObject = { ...object };
      return newObject;
    }
  }
  return object;
};

export const deleteFile = (filePath: string) => {
  unlink(filePath, err => {
    if (err) {
      throw err;
    }
    console.log(filePath, " has been deleted");
  });
};
