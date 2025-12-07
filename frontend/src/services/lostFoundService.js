// frontend/src/services/lostFoundService.js
import api from "./api";

// CREATE lost & found item
export const createLostFoundItem = async (itemData, token) => {
  const res = await api.post("/lostfound", itemData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// GET all items
export const getLostFoundItems = async () => {
  const res = await api.get("/lostfound");
  return res.data;
};

// UPDATE / RESOLVE item (if you have)
export const updateLostFoundItem = async (id, updateData, token) => {
  const res = await api.put(`/lostfound/${id}`, updateData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};
