import React from "react";

const Summary = ({ data, onComplete, back }) => {

  const handleComplete = async () => {
    console.log("Sending data:", data);
    try {
      const response = await fetch("http://localhost:5000/api/bot/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onComplete();
      } else {
        console.error("Failed to save data:", await response.json());
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="summary" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Summary of Your Choices</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Goals:</strong> {data.goals.join(", ")}</p>
      <p><strong>Confidence Level:</strong> {JSON.stringify(data.confidenceLevels)}</p>
      <p><strong>Time Availability:</strong> {data.timeAvailability}</p>
      {data.addiction && <p><strong>Addiction Details:</strong> {data.addiction}</p>}

      {/* Render selected social life categories if they are present */}
      {data.socialLifeCategories && data.socialLifeCategories.length > 0 && (
        <div>
          <h3>Selected Social Life Areas:</h3>
          <ul>
            {data.socialLifeCategories.map((category, index) => (
              <li key={index} style={{ margin: "5px 0", listStyleType: "circle" }}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back and Complete buttons */}
      <div className="navigation" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button onClick={back} style={buttonStyle}>Back</button>
        <button onClick={handleComplete} style={buttonStyle}>Complete</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  transition: "background-color 0.3s ease",
};

export default Summary;
