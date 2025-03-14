import React, { useState } from "react";

const Step1UserDetails = ({ data, update, next }) => {
  const [name, setName] = useState(data.name || "");
  const [age, setAge] = useState(data.age || "");

  const handleNext = () => {
    if (name && age) {
      update("name", name);
      update("age", age);
      next();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="step step1">
      <h2>Welcome! Let's start with your details</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Your Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step1UserDetails;
