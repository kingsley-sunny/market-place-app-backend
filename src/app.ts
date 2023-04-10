import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import bodyParser from "body-parser";
import { adminRoutes, authRoutes, productRoutes } from "./apis";
import { sequelize } from "./db";
import { syncDBRelations } from "./db-relations";
import { isAuth } from "./middlewares";
import { createErrorObj } from "./utils";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));

// The  routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", isAuth, adminRoutes);

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
