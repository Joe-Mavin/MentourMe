import React, { useState } from 'react';

const MentorOnboardingContainer = ({ onComplete }) => {
  const [applicationData, setApplicationData] = useState({
    experience: '',
    motivation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/mentorship/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });
      if (response.ok) {
        localStorage.setItem('onboarded', 'true');
        onComplete();
      } else {
        alert('Failed to complete onboarding');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Mentor Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Experience:</label>
          <textarea name="experience" value={applicationData.experience} onChange={handleChange} required />
        </div>
        <div>
          <label>Motivation:</label>
          <textarea name="motivation" value={applicationData.motivation} onChange={handleChange} required />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default MentorOnboardingContainer; 