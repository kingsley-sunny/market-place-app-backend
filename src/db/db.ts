import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbName = process.env.DB_NAME || "hello";
const dbUsername = process.env.DB_USERNAME || "hello";
const dbPassword = process.env.DB_PASSWORD || "hello";

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "localhost",
  dialect: "mysql",
});
