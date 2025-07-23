import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import Journey from "./journey.mjs";

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
  onboarded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'mentor', 'therapist'),
    defaultValue: 'user',
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'pending', 'rejected'),
    defaultValue: 'active',
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt & updatedAt automatically
});

export default User;
