import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config/environment';

export const useJourney = () => {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  const fetchJourney = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(ENDPOINTS.BOT.JOURNEY, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJourney(res.data.journey);
    } catch (err) {
      setJourney(null);
      setError('No journey found. Please complete onboarding or generate a journey.');
    } finally {
      setLoading(false);
    }
  };

  const generateJourney = async () => {
    setGenerating(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const payload = { 
        goal: 'Personal Development', 
        startDate: new Date().toISOString().slice(0, 10) 
      };
      await axios.post(ENDPOINTS.BOT.GENERATE_JOURNEY, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchJourney();
      return { success: true, message: 'Journey created! 🎉' };
    } catch (err) {
      return { success: false, message: 'Failed to create journey' };
    } finally {
      setGenerating(false);
    }
  };

  const handleTaskAction = async (taskId, action) => {
    try {
      const token = localStorage.getItem('token');
      const url = action === 'done' 
        ? ENDPOINTS.BOT.COMPLETE_TASK(taskId) 
        : ENDPOINTS.BOT.SKIP_TASK(taskId);
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchJourney();
      return { 
        success: true, 
        message: action === 'done' ? 'Task marked as done! 🎉' : 'Task skipped.' 
      };
    } catch (err) {
      return { success: false, message: 'Failed to update task' };
    }
  };

  useEffect(() => {
    fetchJourney();
  }, []);

  const progress = journey ? (journey.completedTasks / journey.totalTasks) * 100 : 0;
  const todayTask = journey?.tasks?.find(t => t.status === 'pending');

  return {
    journey,
    loading,
    error,
    generating,
    progress,
    todayTask,
    fetchJourney,
    generateJourney,
    handleTaskAction,
  };
}; 