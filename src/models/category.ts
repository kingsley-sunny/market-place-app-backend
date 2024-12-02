import { INTEGER, ModelDefined, STRING, UUID } from "sequelize";
import { sequelize } from "src/db";

interface ICategory {
  name: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  uuid: string;
}

export const Category: ModelDefined<ICategory, ICategory> = sequelize.define(
  "category",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: UUID,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  },
  { indexes: [{ type: "FULLTEXT", fields: ["name"] }] }
);
