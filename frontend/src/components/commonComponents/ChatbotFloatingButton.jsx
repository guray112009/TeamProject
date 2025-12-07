import React from "react";
import { useNavigate } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";

export const ChatbotFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chatbot")}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        background: "#4B4BFF",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "26px",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        zIndex: 9999,
      }}
    >
      <BsChatDotsFill />
    </button>
  );
};

export default ChatbotFloatingButton;
