import React from "react";

const timeOptions = ["5 minutes", "10 minutes", "20 minutes"];

const Step4TimeAvailability = ({ data, update, next, back }) => {
  const [time, setTime] = React.useState(data.timeAvailability || "");

  const handleNext = () => {
    if (time) {
      update("timeAvailability", time);
      next();
    } else {
      alert("Please select your available time.");
    }
  };

  return (
    <div className="step step4">
      <h2>How much time can you dedicate daily?</h2>
      <div className="time-options">
        {timeOptions.map((option) => (
          <button
            key={option}
            className={time === option ? "selected" : ""}
            onClick={() => setTime(option)}
          >
            {option}
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

export default Step4TimeAvailability;
