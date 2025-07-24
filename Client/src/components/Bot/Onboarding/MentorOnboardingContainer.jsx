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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit application data for review
    console.log('Mentor application submitted:', applicationData);
    localStorage.setItem('onboarded', 'true');
    onComplete();
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