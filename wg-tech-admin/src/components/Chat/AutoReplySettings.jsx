import React, { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, ToggleRight, ToggleLeft } from "lucide-react";
import "./AutoReplySettings.css";

const AutoReplySettings = ({ adminId, onClose }) => {
  const [autoReplies, setAutoReplies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "custom",
    triggerKeywords: "",
    responseDelay: 0,
    maxUsesPerDay: "",
    isActive: true,
  });

  useEffect(() => {
    fetchAutoReplies();
  }, [adminId]);

  const fetchAutoReplies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/auto-replies/admin/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAutoReplies(data.data);
      }
    } catch (error) {
      console.error("Error fetching auto-replies:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      adminId,
      title: formData.title,
      message: formData.message,
      category: formData.category,
      triggerKeywords: formData.triggerKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k),
      responseDelay: parseInt(formData.responseDelay),
      maxUsesPerDay: formData.maxUsesPerDay ? parseInt(formData.maxUsesPerDay) : null,
      isActive: formData.isActive,
    };

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/auto-replies/${editingId}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/auto-replies`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        fetchAutoReplies();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving auto-reply:", error);
    }
  };

  const handleEdit = (autoReply) => {
    setFormData({
      title: autoReply.title,
      message: autoReply.message,
      category: autoReply.category,
      triggerKeywords: autoReply.triggerKeywords.join(", "),
      responseDelay: autoReply.responseDelay,
      maxUsesPerDay: autoReply.maxUsesPerDay || "",
      isActive: autoReply.isActive,
    });
    setEditingId(autoReply._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this auto-reply?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/auto-replies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchAutoReplies();
      }
    } catch (error) {
      console.error("Error deleting auto-reply:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/auto-replies/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchAutoReplies();
      }
    } catch (error) {
      console.error("Error toggling auto-reply:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      category: "custom",
      triggerKeywords: "",
      responseDelay: 0,
      maxUsesPerDay: "",
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auto-reply-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Auto-Reply Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {!showForm ? (
          <div className="auto-replies-list">
            <button
              className="btn-add-reply"
              onClick={() => setShowForm(true)}
            >
              <Plus size={20} /> Add Auto-Reply
            </button>

            {autoReplies.length > 0 ? (
              <div className="replies-container">
                {autoReplies.map((reply) => (
                  <div key={reply._id} className="reply-item">
                    <div className="reply-info">
                      <h4>{reply.title}</h4>
                      <p className="reply-category">
                        Category: <strong>{reply.category}</strong>
                      </p>
                      <p className="reply-keywords">
                        Keywords: {reply.triggerKeywords.join(", ")}
                      </p>
                      <p className="reply-message">{reply.message}</p>
                    </div>

                    <div className="reply-actions">
                      <button
                        className="toggle-btn"
                        onClick={() => handleToggle(reply._id)}
                        title="Toggle active status"
                      >
                        {reply.isActive ? (
                          <ToggleRight size={20} color="green" />
                        ) : (
                          <ToggleLeft size={20} color="red" />
                        )}
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(reply)}
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(reply._id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-replies">
                <p>No auto-replies yet. Create one!</p>
              </div>
            )}
          </div>
        ) : (
          <form className="auto-reply-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Greeting"
                required
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Auto-reply message..."
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="greeting">Greeting</option>
                  <option value="faq">FAQ</option>
                  <option value="support">Support</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="form-group">
                <label>Response Delay (seconds):</label>
                <input
                  type="number"
                  value={formData.responseDelay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      responseDelay: parseInt(e.target.value),
                    })
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Trigger Keywords (comma-separated):</label>
                <input
                  type="text"
                  value={formData.triggerKeywords}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      triggerKeywords: e.target.value,
                    })
                  }
                  placeholder="e.g., hello, hi, greetings"
                  required
                />
              </div>

              <div className="form-group">
                <label>Max Uses Per Day (optional):</label>
                <input
                  type="number"
                  value={formData.maxUsesPerDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxUsesPerDay: e.target.value,
                    })
                  }
                  min="1"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                Active
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {editingId ? "Update" : "Create"} Auto-Reply
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AutoReplySettings;
