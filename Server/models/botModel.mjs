import { DataTypes } from "sequelize";
import sequelize from "../db.mjs";

const BotInteraction = sequelize.define("BotInteraction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  confidenceLevels: {
    type: DataTypes.TEXT, // Store JSON as a string
    allowNull: true,
  },
  timeAvailability: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addiction: {
    type: DataTypes.STRING,
    allowNull: true, // Only used when "Addiction" is a goal
  },
});

export default BotInteraction;
