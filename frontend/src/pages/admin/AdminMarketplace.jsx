import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../styles/AdminLayout.css";
import "../../styles/AdminMarketplace.css";
import { useAuth } from "../../context/AuthContext";

// ⭐ Use Render API URL
const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminMarketplace() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  // EDIT MODAL STATE
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  // ============================
  // LOAD MARKETPLACE ITEMS
  // ============================
  useEffect(() => {
    fetch(`${API_BASE}/marketplace`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) =>
        console.error("❌ Error fetching marketplace (Admin):", err)
      );
  }, [token]);

  // ============================
  // DELETE MARKETPLACE ITEM
  // ============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this marketplace item?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/marketplace/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setItems(items.filter((item) => item._id !== id));
        alert("Item deleted successfully.");
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // ============================
  // OPEN EDIT MODAL
  // ============================
  const handleEdit = (item) => {
    setEditItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      price: item.price,
    });
  };

  // ============================
  // SAVE EDIT
  // ============================
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${API_BASE}/marketplace/${editItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setItems((prev) =>
        prev.map((i) => (i._id === updated._id ? updated : i))
      );

      alert("Item updated successfully!");

      setEditItem(null);
    } catch (err) {
      console.error("❌ Edit error:", err);
    }
  };

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-page-title">Marketplace Management</h1>
        <p className="admin-page-subtitle">
          View and manage items listed in Marketplace.
        </p>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Posted By</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>${item.price || "0"}</td>
                    <td>{item.postedBy?.fullName || "Unknown"}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No marketplace items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =============================== */}
        {/* EDIT MODAL */}
        {/* =============================== */}
        {editItem && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit Marketplace Item</h2>

              <div className="modal-form">
                <label>Title</label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleChange}
                />

                <label>Price ($)</label>
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveEdit}>
                  💾 Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditItem(null)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
