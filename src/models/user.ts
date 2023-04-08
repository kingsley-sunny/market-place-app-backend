import { BOOLEAN, DataTypes, ModelDefined, Optional, STRING, UUID } from "sequelize";
import { sequelize } from "../db/db.js";

interface IUserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
  type: string;
}

type IUserCreationAttributes = Optional<IUserAttributes, "isVerified" | "type">;

const User: ModelDefined<IUserAttributes, IUserCreationAttributes> = sequelize.define(
  "User",
  {
    id: {
      type: UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    isVerified: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    type: {
      type: STRING,
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      includePassword: {
        attributes: { include: ["password"] },
      },
    },
  }
);

export default User;
