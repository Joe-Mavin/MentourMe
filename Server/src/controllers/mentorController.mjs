import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import Specialization from '../models/specialization.mjs';

// List all mentors, optionally filter by specialization
export const getMentors = async (req, res) => {
  try {
    const { specialization } = req.query;
    let where = { role: 'mentor' };
    let include = [];
    if (specialization) {
      include.push({
        model: Specialization,
        as: 'specializations',
        where: { name: specialization },
        through: { attributes: [] },
      });
    } else {
      include.push({ model: Specialization, as: 'specializations', through: { attributes: [] } });
    }
    const mentors = await User.findAll({ where, include });
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all therapists, optionally filter by specialization
export const getTherapists = async (req, res) => {
  try {
    const { specialization } = req.query;
    let where = { role: 'therapist' };
    let include = [];
    if (specialization) {
      include.push({
        model: Specialization,
        as: 'specializations',
        where: { name: specialization },
        through: { attributes: [] },
      });
    } else {
      include.push({ model: Specialization, as: 'specializations', through: { attributes: [] } });
    }
    const therapists = await User.findAll({ where, include });
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all specializations
export const getSpecializations = async (req, res) => {
  try {
    const specs = await Specialization.findAll();
    res.json(specs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new specialization
export const createSpecialization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const spec = await Specialization.create({ name, description });
    res.status(201).json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign specializations to a user (mentor/therapist)
export const assignSpecializations = async (req, res) => {
  try {
    const { id } = req.params;
    const { specializationIds } = req.body; // array of specialization UUIDs
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const specs = await Specialization.findAll({ where: { id: specializationIds } });
    await user.setSpecializations(specs);
    res.json({ message: 'Specializations updated', specializations: specs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mentor dashboard: get mentees assigned to a mentor (stub, needs assignment logic)
export const getMentorDashboard = async (req, res) => {
  // For demo, just return all users with role 'user'
  try {
    const mentees = await User.findAll({ where: { role: 'user' } });
    res.json({ mentees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Therapist dashboard: get clients assigned to a therapist (stub, needs assignment logic)
export const getTherapistDashboard = async (req, res) => {
  // For demo, just return all users with role 'user'
  try {
    const clients = await User.findAll({ where: { role: 'user' } });
    res.json({ clients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const completeMentorOnboarding = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Optionally save application data from req.body
    // const { experience, motivation } = req.body;
    // You can store this in a MentorApplication table if needed

    // Mark mentor as onboarded
    await User.update({ onboarded: true }, { where: { id: decoded.id } });

    res.status(200).json({ message: 'Mentor onboarding complete' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}; 