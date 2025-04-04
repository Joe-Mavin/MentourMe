import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,  // Ensure this field exists
    allowNull: false,        // Cannot be NULL
  },
}, {
  timestamps: true, // Adds createdAt & updatedAt automatically
});

export default User;
