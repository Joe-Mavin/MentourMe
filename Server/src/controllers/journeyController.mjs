import Journey from "../models/journey.mjs";
import Task from "../models/task.mjs";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

// Helper: generate mock tasks for a journey
function generateMockTasks(goal, startDate, userId, journeyId) {
  const baseDate = new Date(startDate);
  const descriptions = [
    `Write down your top 3 goals for ${goal}.`,
    `Reflect on a recent challenge related to ${goal}.`,
    `Read a chapter from a book about ${goal}.`,
    `Practice 10 minutes of mindfulness meditation.`,
    `Reach out to a mentor or peer for advice.`,
    `Set a new micro-habit for the week.`,
    `Review your progress and journal your thoughts.`,
  ];
  return descriptions.map((desc, i) => ({
    journeyId,
    userId,
    day: i + 1,
    description: desc,
    dueDate: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
    status: 'pending',
  }));
}

export const generateJourney = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Use onboarding data from request or user profile
    const { goal = 'Personal Development', startDate = new Date().toISOString().slice(0, 10) } = req.body;

    // Create journey
    const journey = await Journey.create({
      userId,
      goal,
      startDate,
      totalTasks: 7,
      completedTasks: 0,
      points: 0,
      status: 'active',
    });

    // Generate and create tasks
    const tasks = generateMockTasks(goal, startDate, userId, journey.id);
    await Task.bulkCreate(tasks);

    res.status(201).json({ message: 'Journey generated', journeyId: journey.id });
  } catch (error) {
    console.error("Generate journey error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getJourney = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Get the user's active journey
    const journey = await Journey.findOne({
      where: { userId, status: 'active' },
      include: [{ model: Task, as: 'tasks' }],
      order: [[{ model: Task, as: 'tasks' }, 'day', 'ASC']],
    });
    if (!journey) {
      return res.status(404).json({ message: 'No active journey found' });
    }
    res.status(200).json({ journey });
  } catch (error) {
    console.error("Get journey error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const completeTask = async (req, res) => {
  res.status(200).json({ message: 'Task marked as done (mock)' });
};

export const skipTask = async (req, res) => {
  res.status(200).json({ message: 'Task skipped (mock)' });
};

export const getLeaderboard = async (req, res) => {
  res.status(200).json({ message: 'Leaderboard data (mock)' });
}; 