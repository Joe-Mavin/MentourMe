import React, { useState, useEffect } from "react";
import Message from "./Message";
import InputBox from "../InputBox/InputBox";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <Message sender="bot" text="Typing..." />}
      </div>
      <InputBox onSend={sendMessage} />
    </div>
  );
};

export default ChatBot;
