import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import bodyParser from "body-parser";
import authRoutes from "./apis/auth.js";
import productRoutes from "./apis/product.js";
import syncDBRelations from "./db-relations/sync-db-relations.js";
import { sequelize } from "./db/db.js";
import { createErrorObj } from "./utils/functions.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// The authentication route
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// if the app has an error
app.use(
  (error: ReturnType<typeof createErrorObj>, req: Request, res: Response, next: NextFunction) => {
    if (!error.status) {
      const err = createErrorObj(error.message, 500);
      return res.status(err.status).json(err);
    }
    return res.status(error.status).json(error);
  }
);

syncDBRelations();

(async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("Connection has been established successfully.");
    console.log(process.env.PORT);

    app.listen(process.env.PORT);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
