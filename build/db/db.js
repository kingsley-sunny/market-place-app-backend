import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
var dbName = process.env.DB_NAME || "hello";
var dbUsername = process.env.DB_USERNAME || "hello";
var dbPassword = process.env.DB_PASSWORD || "hello";
export var sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: "localhost",
    dialect: "mysql"
});
