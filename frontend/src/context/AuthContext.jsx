// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ⭐ 100% CORRECT FOR LOCAL + RENDER
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ⭐ Always include JSON + CORS headers
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Persist USER
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Persist TOKEN
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // ============================================================
  // ⭐ REGISTER — FIXED FOR RENDER (FULL URL + JSON payload)
  // ============================================================
  const register = async (fullName, email, password, role) => {
    try {
      const res = await axios.post(`${API_BASE}/users/register`, {
        fullName,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login now.");
      return true;
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed!");
      return false;
    }
  };

  // ============================================================
  // ⭐ LOGIN — FIXED FOR RENDER
  // ============================================================
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/users/login`, {
        email,
        password,
      });

      const { user: loggedInUser, token: jwtToken } = res.data;

      setUser(loggedInUser);
      setToken(jwtToken);

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", jwtToken);

      return true;
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed!");
      return false;
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken("");

    navigate("/login");
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const isLoggedIn = () => !!user;
  const isAdmin = () => user?.role === "admin";
  const isStaff = () => user?.role === "staff";
  const isStudent = () => user?.role === "student";

  const userId = user?._id || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        authHeaders,
        login,
        register,
        logout,
        isLoggedIn,
        isAdmin,
        isStaff,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
