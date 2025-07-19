import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Journey = sequelize.define("Journey", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  completedTasks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalTasks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // active, completed, paused, etc.
  },
}, {
  timestamps: true,
});

export default Journey; 