// backend/controllers/chatController.js

import axios from "axios";

export const chatWithProfessor = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content:
              "You are UniConnect's virtual professor. Always answer clearly, politely, and professionally.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;

    return res.status(200).json({ reply: botMessage });
  } catch (error) {
    console.error("Chatbot Error:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Chatbot request failed",
      details: error.response?.data || error.message,
    });
  }
};
