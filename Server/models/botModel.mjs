import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a new bot interaction for a user
export const createBotInteraction = async (userId, goals, confidenceLevels, timeAvailability, addiction, socialLifeCategories) => {
  try {
    // Create the BotInteraction record
    const newInteraction = await prisma.botInteraction.create({
      data: {
        userId,
        confidenceLevels: JSON.stringify(confidenceLevels), // If confidenceLevels is an object, make sure to stringify it
        timeAvailability,
        addiction: goals.includes('Addiction') ? addiction : null, // Only associate addiction details if "Addiction" is a goal
      },
    });

    // Create the Goal records and connect them to the new BotInteraction
    const createdGoals = await prisma.goal.createMany({
      data: goals.map(goal => ({
        value: goal,
        botInteractionId: newInteraction.id, // Connecting Goal to BotInteraction
      })),
    });

    // If "Social Life" is in the selected goals, create and associate the SocialLifeCategories
    let createdCategories = [];
    if (goals.includes('Social Life') && socialLifeCategories && socialLifeCategories.length > 0) {
      createdCategories = await prisma.socialLifeCategory.createMany({
        data: socialLifeCategories.map(category => ({
          value: category,
          botInteractionId: newInteraction.id, // Connecting SocialLifeCategory to BotInteraction
        })),
      });
    }

    // Return the created BotInteraction, along with the related Goals and SocialLifeCategories (if any)
    return {
      botInteraction: newInteraction,
      goals: createdGoals,
      categories: createdCategories,
    };
  } catch (error) {
    console.error('Error creating bot interaction:', error);
    throw new Error('Error creating bot interaction');
  }
};

// Function to get all bot interactions for a specific user
export const getBotInteractionsByUser = async (userId) => {
  try {
    const interactions = await prisma.botInteraction.findMany({
      where: {
        userId,
      },
    });
    return interactions;
  } catch (error) {
    console.error('Error fetching bot interactions:', error);
    throw new Error('Error fetching bot interactions');
  }
};

// Function to update a bot interaction
export const updateBotInteraction = async (interactionId, updatedData) => {
  try {
    const updatedInteraction = await prisma.botInteraction.update({
      where: {
        id: interactionId,
      },
      data: updatedData,
    });
    return updatedInteraction;
  } catch (error) {
    console.error('Error updating bot interaction:', error);
    throw new Error('Error updating bot interaction');
  }
};

// Function to delete a bot interaction
export const deleteBotInteraction = async (interactionId) => {
  try {
    const deletedInteraction = await prisma.botInteraction.delete({
      where: {
        id: interactionId,
      },
    });
    return deletedInteraction;
  } catch (error) {
    console.error('Error deleting bot interaction:', error);
    throw new Error('Error deleting bot interaction');
  }
};
