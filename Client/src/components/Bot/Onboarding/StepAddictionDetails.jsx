import React, { useState } from "react";

const addictionTypes = [
  "Substance Abuse",
  "Technology Addiction",
  "Gambling",
  "Smoking",
  "Alcohol",
  "Other",
];

const StepAddictionDetails = ({ data, update, next, back }) => {
  const [selectedAddiction, setSelectedAddiction] = useState(data.addiction || "");

  const handleNext = () => {
    if (selectedAddiction) {
      update("addiction", selectedAddiction);
      next();
    } else {
      alert("Please select an addiction type.");
    }
  };

  return (
    <div className="step addiction-details">
      <h2>Please specify the type of addiction you'd like to address:</h2>
      <div className="addiction-options">
        {addictionTypes.map((type) => (
          <button
            key={type}
            className={selectedAddiction === type ? "selected" : ""}
            onClick={() => setSelectedAddiction(type)}
          >
            {type}
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

export default StepAddictionDetails;
