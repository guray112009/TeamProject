// frontend/src/services/marketplaceService.js
import api from "./api";

export const createPost = async (postData, token) => {
  const res = await api.post("/marketplace", postData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const getMarketplacePosts = async () => {
  const res = await api.get("/marketplace");
  return res.data;
};

export const deletePost = async (id, token) => {
  const res = await api.delete(`/marketplace/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};
