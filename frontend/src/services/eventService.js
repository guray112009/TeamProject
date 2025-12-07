// frontend/src/services/eventService.js
import api from "./api";

// CREATE event
export const createEvent = async (eventData, token) => {
  const res = await api.post("/events", eventData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// GET all events
export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

// DELETE event (if you have this)
export const deleteEvent = async (id, token) => {
  const res = await api.delete(`/events/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};
