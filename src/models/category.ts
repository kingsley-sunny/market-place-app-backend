import { ModelDefined, STRING, UUID } from "sequelize";
import { sequelize } from "src/db";

interface Icategory {
  name: string;
  createdAt?: string;
  updatedAt?: string;
  id: string;
}

export const Category: ModelDefined<Icategory, Icategory> = sequelize.define(
  "category",
  {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  },
  { indexes: [{ type: "FULLTEXT", fields: ["name"] }] }
);
