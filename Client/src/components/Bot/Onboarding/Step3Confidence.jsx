import React from "react";

const Step3Confidence = ({ data, update, next, back }) => {
  const goals = data.goals || [];
  const [confidenceLevels, setConfidenceLevels] = React.useState(data.confidenceLevels || {});

  const handleConfidenceChange = (goal, level) => {
    setConfidenceLevels((prev) => ({ ...prev, [goal]: level }));
  };

  const handleNext = () => {
    if (Object.keys(confidenceLevels).length === goals.length) {
      update("confidenceLevels", confidenceLevels);
      next();
    } else {
      alert("Please set confidence levels for all goals.");
    }
  };

  return (
    <div className="step step3">
      <h2>Rate your confidence in these areas (1-10)</h2>
      {goals.map((goal) => (
        <div key={goal}>
          <label>{goal}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={confidenceLevels[goal] || 5}
            onChange={(e) => handleConfidenceChange(goal, e.target.value)}
          />
          <span>{confidenceLevels[goal] || 5}</span>
        </div>
      ))}
      <div className="navigation">
        <button onClick={back}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step3Confidence;
