import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatbotPage.css";
import axios from "axios";

/* ⭐ Speech Recognition */
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

/* ⭐ Professor Avatar */
import professorAvatar from "../assets/professor-avatar.webp";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  /* ⭐ Speech Recognition hooks */
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Apply transcript to text input automatically
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Typing animation function
  const typeMessage = async (text) => {
    setIsTyping(true);

    let displayed = "";
    const speed = 12; // typing speed

    for (let i = 0; i < text.length; i++) {
      displayed += text[i];
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { sender: "bot", text: displayed },
      ]);

      await new Promise((res) => setTimeout(res, speed));
    }

    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Placeholder bot bubble for typing animation
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chatbot`,
        {
          message: userText,
        }
      );

      const botReply = res.data.reply;

      await typeMessage(botReply);
    } catch (err) {
      console.error("Chatbot Error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  /* ⭐ Start / Stop Listening */
  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="chatbot-page-container">

      <div className="chatbot-box">

        {/* ⭐ HEADER WITH AVATAR */}
        <div className="chat-header">
          <img src={professorAvatar} alt="Professor" className="chat-avatar" />
          <h2 className="chat-title">UniConnect Virtual Professor</h2>
        </div>

        {/* CHAT WINDOW */}
        <div className="chat-window">

          {messages.map((msg, idx) => (
            <div key={idx}
              className={`chat-row ${msg.sender === "bot" ? "bot-row" : "user-row"}`}
            >
              {/* Bot avatar beside bot messages */}
              {msg.sender === "bot" && (
                <img src={professorAvatar} className="bubble-avatar" alt="AI" />
              )}

              <div
                className={`chat-bubble ${
                  msg.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">Professor is typing...</div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* INPUT AREA */}
        <div className="chat-input-area">

          {/* ⭐ Microphone Button */}
          <button
            className={`mic-btn ${listening ? "mic-listening" : ""}`}
            onMouseDown={startListening}
            onMouseUp={stopListening}
            title="Hold to speak"
          >
            🎤
          </button>

          <input
            type="text"
            placeholder="Ask the professor anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />

          <button onClick={sendMessage} className="send-btn">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
