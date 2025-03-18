import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";
import BotInteraction from "./BotInteraction.mjs";

const Goal = sequelize.define("Goal", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

BotInteraction.hasMany(Goal, { foreignKey: "botInteractionId", onDelete: "CASCADE" });
Goal.belongsTo(BotInteraction, { foreignKey: "botInteractionId" });

export default Goal;
