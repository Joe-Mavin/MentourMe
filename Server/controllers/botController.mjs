import { createBotInteraction, getBotInteractionsByUser, updateBotInteraction, deleteBotInteraction } from '../models/botInteraction.mjs/index.js';

// Controller to create a new bot interaction
export const createInteraction = async (req, res) => {
  const { goals, confidenceLevels, timeAvailability, addiction = "", socialLifeCategories = [] } = req.body;

  // Debug log to see the received data
  console.log('Received data:', { goals, confidenceLevels, timeAvailability, addiction, socialLifeCategories });

  // Check if required fields are provided
  if (!goals || !confidenceLevels || !timeAvailability || (goals.includes('Social Life') && socialLifeCategories.length === 0)) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    // Create a new bot interaction
    const newInteraction = await createBotInteraction(
      req.user.id,
      goals,
      confidenceLevels,
      timeAvailability,
      addiction, // Passing addiction, it can be an empty string
      socialLifeCategories // Passing socialLifeCategories, it can be an empty array
    );
    res.status(201).json(newInteraction);
  } catch (error) {
    console.error('Error creating bot interaction:', error);
    res.status(500).json({ error: 'Error creating bot interaction' });
  }
};

// Controller to get all bot interactions for the authenticated user
export const getInteractions = async (req, res) => {
  try {
    const interactions = await getBotInteractionsByUser(req.user.id);

    if (interactions.length === 0) {
      return res.status(404).json({ message: 'No interactions found for this user' });
    }

    res.status(200).json(interactions);
  } catch (error) {
    console.error('Error fetching bot interactions:', error);
    res.status(500).json({ error: 'Error fetching bot interactions' });
  }
};

// Controller to update a bot interaction
export const updateInteraction = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedInteraction = await updateBotInteraction(id, updatedData);
    res.status(200).json(updatedInteraction);
  } catch (error) {
    console.error('Error updating bot interaction:', error);
    res.status(500).json({ error: 'Error updating bot interaction' });
  }
};

// Controller to delete a bot interaction
export const deleteInteraction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInteraction = await deleteBotInteraction(id);
    res.status(200).json(deletedInteraction);
  } catch (error) {
    console.error('Error deleting bot interaction:', error);
    res.status(500).json({ error: 'Error deleting bot interaction' });
  }
};
