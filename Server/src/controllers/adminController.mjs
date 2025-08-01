import User from '../models/user.mjs';

export const reviewMentorApplications = async (req, res) => {
  try {
    const pendingMentors = await User.findAll({ where: { role: 'mentor', status: 'pending' } });
    res.json(pendingMentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveMentorApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    const mentor = await User.findOne({ where: { id: userId, role: 'mentor', status: 'pending' } });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found or not pending' });
    mentor.status = 'active';
    await mentor.save();
    res.json({ message: 'Mentor approved', mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectMentorApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    const mentor = await User.findOne({ where: { id: userId, role: 'mentor', status: 'pending' } });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found or not pending' });
    mentor.status = 'rejected';
    await mentor.save();
    res.json({ message: 'Mentor rejected', mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 