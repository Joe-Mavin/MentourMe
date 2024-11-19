import React from "react";
import "./ChatBot.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
