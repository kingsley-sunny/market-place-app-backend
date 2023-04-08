import { BOOLEAN, DataTypes, STRING, UUID } from "sequelize";
import { sequelize } from "../db/db.js";

const User = sequelize.define("User", {
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
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

export default User;
