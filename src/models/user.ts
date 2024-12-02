import { BOOLEAN, DataTypes, INTEGER, ModelDefined, Optional, STRING, UUID } from "sequelize";
import { sequelize } from "src/db";

interface IUserAttributes {
  id?: string;
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
  type: string;
}

type IUserCreationAttributes = Optional<IUserAttributes, "isVerified" | "type">;

export const User: ModelDefined<IUserAttributes, IUserCreationAttributes> = sequelize.define(
  "user",
  {
    id: {
      type: INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: UUID,
      allowNull: false,
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
