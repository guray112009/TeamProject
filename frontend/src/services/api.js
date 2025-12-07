// frontend/src/services/api.js
import axios from "axios";

// ⭐ Use the same base as AuthContext + Chatbot
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  // withCredentials optional – your API doesn’t need cookies
  // withCredentials: true,
});

export default api;
