import BotInteraction from "../models/BotInteraction.mjs";
import Goal from "../models/Goal.mjs";
import SocialLifeCategory from "../models/SocialLifeCategory.mjs";

// Function to create a new bot interaction for a user
export const createBotInteraction = async (userId, goals, confidenceLevels, timeAvailability, addiction, socialLifeCategories) => {
  try {
    const newInteraction = await BotInteraction.create({
      userId,
      confidenceLevels: JSON.stringify(confidenceLevels),
      timeAvailability,
      addiction: goals.includes("Addiction") ? addiction : null,
    });

    // Create associated goals
    const createdGoals = await Promise.all(
      goals.map((goal) => Goal.create({ value: goal, botInteractionId: newInteraction.id }))
    );

    // Create associated social life categories (if applicable)
    let createdCategories = [];
    if (goals.includes("Social Life") && socialLifeCategories?.length > 0) {
      createdCategories = await Promise.all(
        socialLifeCategories.map((category) => SocialLifeCategory.create({ value: category, botInteractionId: newInteraction.id }))
      );
    }

    return { botInteraction: newInteraction, goals: createdGoals, categories: createdCategories };
  } catch (error) {
    console.error("Error creating bot interaction:", error);
    throw new Error("Error creating bot interaction");
  }
};

// Function to get all bot interactions for a specific user
export const getBotInteractionsByUser = async (userId) => {
  try {
    return await BotInteraction.findAll({
      where: { userId },
      include: [Goal, SocialLifeCategory],
    });
  } catch (error) {
    console.error("Error fetching bot interactions:", error);
    throw new Error("Error fetching bot interactions");
  }
};

// Function to update a bot interaction
export const updateBotInteraction = async (interactionId, updatedData) => {
  try {
    await BotInteraction.update(updatedData, { where: { id: interactionId } });
    return await BotInteraction.findByPk(interactionId);
  } catch (error) {
    console.error("Error updating bot interaction:", error);
    throw new Error("Error updating bot interaction");
  }
};

// Function to delete a bot interaction
export const deleteBotInteraction = async (interactionId) => {
  try {
    const deleted = await BotInteraction.destroy({ where: { id: interactionId } });
    return deleted ? { message: "Deleted successfully" } : { message: "Not found" };
  } catch (error) {
    console.error("Error deleting bot interaction:", error);
    throw new Error("Error deleting bot interaction");
  }
};
