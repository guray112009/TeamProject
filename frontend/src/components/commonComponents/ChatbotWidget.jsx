import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import "../../styles/ChatbotWidget.css";

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = { sender: "bot", text: data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        className="chatbot-floating-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes size={20} /> : <FaRobot size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-box">
          <h3 className="chatbot-title">Ask Professor 🤖</h3>

          <div className="chatbot-messages">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${
                  msg.sender === "user" ? "user-msg" : "bot-msg"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="bot-msg">Typing...</div>}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage} className="send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
