import React, { useState } from "react";

const goalsList = [
  "Personal Development",
  "Stress Management",
  "Social Life",
  "Career Advice",
  "Physical Health",
  "Spirituality",
  "Addiction", // New goal option
];

const Step2Goals = ({ data, update, next, back }) => {
  const [selectedGoals, setSelectedGoals] = useState(data.goals || []);

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      update("goals", selectedGoals);
      if (selectedGoals.includes("Addiction")) {
        next("addiction"); // Navigate to the addiction step
      } else {
        next(); // Proceed to the next regular step
      }
    } else {
      alert("Please select at least one goal.");
    }
  };

  return (
    <div className="step step2">
      <h2>What would you like to work on?</h2>
      <div className="goals">
        {goalsList.map((goal) => (
          <button
            key={goal}
            className={selectedGoals.includes(goal) ? "selected" : ""}
            onClick={() => toggleGoal(goal)}
          >
            {goal}
          </button>
        ))}
      </div>
      <div className="navigation">
        <button onClick={back}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2Goals;
