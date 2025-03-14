import React, { useState } from "react";

const socialLifeCategories = [
  { name: "Building Social Confidence", description: "Enhance your ability to connect with others and project confidence in social situations." },
  { name: "Expanding Your Social Circle", description: "Meet new people and form meaningful relationships through hobbies, events, and communities." },
  { name: "Developing Communication Skills", description: "Improve active listening, express yourself clearly, and handle debates or disagreements effectively." },
  { name: "Navigating Friendships", description: "Maintain healthy friendships, set boundaries, and handle toxic relationships." },
  { name: "Dating and Romantic Relationships", description: "Build meaningful romantic connections while balancing confidence and vulnerability." },
  { name: "Professional Networking", description: "Expand your professional network and maintain productive connections." },
  { name: "Managing Social Anxiety", description: "Overcome social anxiety through mindfulness and structured techniques." },
  { name: "Hosting and Initiating Events", description: "Organize events that foster connection and engagement among participants." },
  { name: "Cultural Awareness and Diversity", description: "Learn to interact respectfully and effectively across cultural boundaries." },
  { name: "Long-term Relationship Building", description: "Develop strategies to nurture and sustain meaningful relationships." },
];

const StepSocialLife = ({ data, update, next, back }) => {
  const [selectedCategories, setSelectedCategories] = useState(data.socialLifeCategories || []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleNext = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to continue.");
      return;
    }
    update("socialLifeCategories", selectedCategories); // Update the parent component's state
    next(); // Proceed to the next step
  };

  const categoryStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    borderRadius: "5px",
  };

  const selectedCategoryStyle = {
    ...categoryStyle,
    backgroundColor: "#007bff",
    color: "white",
  };

  const hoverCategoryStyle = {
    ...categoryStyle,
    backgroundColor: "#f0f0f0",
  };

  const navigationStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
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

  return (
    <div className="step social-life" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Select Areas of Focus for Social Life</h2>
      <p>Choose the areas you'd like to work on to improve your social life.</p>
      <div className="categories" style={{ display: "flex", flexWrap: "wrap" }}>
        {socialLifeCategories.map((category) => (
          <div
            key={category.name}
            style={selectedCategories.includes(category.name) ? selectedCategoryStyle : categoryStyle}
            onClick={() => toggleCategory(category.name)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = hoverCategoryStyle.backgroundColor)} // Hover effect
            onMouseLeave={(e) => (e.target.style.backgroundColor = "")} // Remove hover effect
          >
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <div className="navigation" style={navigationStyle}>
        <button onClick={back} style={buttonStyle}>Back</button>
        <button onClick={handleNext} style={buttonStyle}>Next</button>
      </div>
    </div>
  );
};

export default StepSocialLife;
