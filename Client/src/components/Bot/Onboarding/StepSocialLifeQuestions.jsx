import React, { useState } from "react";

const questionsByCategory = {
  "Building Social Confidence": [
    "How comfortable are you when starting a conversation with strangers?",
    "Do you struggle with maintaining eye contact?",
    "What are your biggest insecurities when it comes to socializing?",
    "Are you aware of your body language during interactions?",
    "How do you handle rejection or awkward situations?",
  ],
  "Expanding Your Social Circle": [
    "How often do you attend events or gatherings?",
    "What hobbies or activities do you currently engage in that help you meet new people?",
    "Do you know how to follow up with new acquaintances?",
    "Are you comfortable introducing yourself in group settings?",
    "What platforms or communities do you use to meet people with similar interests?",
  ],
  // Add additional questions for other categories...
};

const StepSocialLifeQuestions = ({ data, update, next, back }) => {
  const selectedCategories = data.socialLifeCategories || [];
  const [answers, setAnswers] = useState(data.socialLifeAnswers || {});

  const handleAnswerChange = (category, question, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [question]: answer,
      },
    }));
  };

  const handleNext = () => {
    update("socialLifeAnswers", answers);
    next();
  };

  return (
    <div className="step social-life-questions">
      <h2>Answer Questions for Your Selected Categories</h2>
      {selectedCategories.map((category) => (
        <div key={category} className="category-questions">
          <h3>{category}</h3>
          {questionsByCategory[category]?.map((question, index) => (
            <div key={index} className="question">
              <p>{question}</p>
              <input
                type="text"
                value={answers[category]?.[question] || ""}
                onChange={(e) => handleAnswerChange(category, question, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="navigation">
        <button onClick={back}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default StepSocialLifeQuestions;
