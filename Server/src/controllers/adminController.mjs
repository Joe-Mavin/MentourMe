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
    await User.update({ status: 'active' }, { where: { id: userId, role: 'mentor', status: 'pending' } });
    res.json({ message: 'Mentor application approved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectMentorApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.update({ status: 'rejected' }, { where: { id: userId, role: 'mentor', status: 'pending' } });
    res.json({ message: 'Mentor application rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 