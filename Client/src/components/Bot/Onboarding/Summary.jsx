import React, { useState } from "react";
import { ENDPOINTS } from "../../../config/environment";

const Summary = ({ data, onComplete, back }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComplete = async () => {
    setError(null);
    setIsSubmitting(true);

    // Ensure age is a number
    const payload = { ...data, age: Number(data.age) };
    
    try {
      const response = await fetch(ENDPOINTS.BOT.INTERACTIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
        onComplete();
        }, 2500); // Show message for 2.5 seconds before redirect
      } else {
        let errorMsg = 'Failed to save data. Please try again.';
        try {
        const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {}
        setError(errorMsg);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="summary" style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>You are onboard a life-changing journey!</h2>
        <p style={{ fontSize: '1.2em', color: '#333', marginBottom: '10px' }}>
          Welcome to <span style={{ fontWeight: 'bold', color: '#007bff' }}>Mahood</span>.<br/>
          This is where men become their best selves.<br/>
          Get ready to unlock your potential, build confidence, and connect with a brotherhood of achievers.<br/>
          <span style={{ color: '#007bff', fontWeight: 'bold' }}>Your journey to greatness starts now.</span>
        </p>
        <p style={{ color: '#888', marginTop: '30px' }}>Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="summary" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Summary of Your Choices</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          {error}
        </div>
      )}
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
        <button onClick={back} style={buttonStyle} disabled={isSubmitting}>Back</button>
        <button 
          onClick={handleComplete} 
          style={{
            ...buttonStyle,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete'}
        </button>
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
