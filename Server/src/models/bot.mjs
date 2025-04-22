import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Interaction = sequelize.define("Interaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goals: {
    type: DataTypes.JSON, // stored as array of strings
    allowNull: false,
  },
  confidenceLevels: {
    type: DataTypes.JSON, // object e.g. { discipline: 3, focus: 4 }
    allowNull: false,
  },
  timeAvailability: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addiction: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  socialLifeCategories: {
    type: DataTypes.JSON, // array of strings
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // if associated with a logged-in user
  },
}, {
  timestamps: true,
  tableName: "interactions",
});

export default Interaction;
