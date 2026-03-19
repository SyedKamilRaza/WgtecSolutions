import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  TrendingUp,
} from "lucide-react";
import MessageList from "./MessageList";
import ProjectStatusIndicator from "./ProjectStatusIndicator";
import "./ChatWindow.css";

const ChatWindow = ({
  chat,
  messages,
  userId,
  onSendMessage,
  onStatusUpdate,
  loading,
  socketRef,
}) => {
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socketRef?.emit("typing", { chatId: chat._id, userId });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketRef?.emit("stop_typing", { chatId: chat._id, userId });
    }, 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendMessage({
      messageType: "text",
      content: messageText,
    });

    setMessageText("");
    setIsTyping(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload file to server and get URL
      // Then send message with file URL
      console.log("File selected:", file.name);
    }
  };

  const handleCallClick = (callType) => {
    socketRef?.emit("initiate_call", {
      callerId: userId,
      receiverId: chat.clientId._id,
      chatId: chat._id,
      callType: callType, // 'voice' or 'video'
    });
  };

  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-window-header">
        <div className="chat-header-info">
          <div className="header-avatar">
            {chat.clientId?.profileImage ? (
              <img src={chat.clientId.profileImage} alt="Chat" />
            ) : (
              <div className="avatar-placeholder">
                {chat.clientId?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="header-details">
            <h2>{chat.clientId?.username}</h2>
            <p className="chat-status">
              {chat.chatType === "admin_work" ? "Project Chat" : "Website Support"}
            </p>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            className="header-action-btn"
            onClick={() => handleCallClick("voice")}
            title="Voice Call"
          >
            <Phone size={20} />
          </button>
          <button
            className="header-action-btn"
            onClick={() => handleCallClick("video")}
            title="Video Call"
          >
            <Video size={20} />
          </button>
          {chat.projectId && (
            <button
              className="header-action-btn"
              onClick={() => setShowStatusUpdate(true)}
              title="Update Status"
            >
              <TrendingUp size={20} />
            </button>
          )}
          <button className="header-action-btn" title="More options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Project Status */}
      {chat.projectId && (
        <ProjectStatusIndicator
          projectId={chat.projectId._id}
          projectName={chat.projectId.title}
          currentStatus={chat.projectId.status}
        />
      )}

      {/* Status Update Modal */}
      {showStatusUpdate && (
        <StatusUpdateModal
          chatId={chat._id}
          projectId={chat.projectId._id}
          onStatusUpdate={onStatusUpdate}
          onClose={() => setShowStatusUpdate(false)}
        />
      )}

      {/* Messages */}
      <div className="messages-container">
        {loading ? (
          <div className="loading-messages">
            <p>Loading messages...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <MessageList messages={messages} userId={userId} />
        ) : (
          <div className="empty-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form className="message-input-form" onSubmit={handleSendMessage}>
        <div className="input-actions">
          <label className="file-upload-btn" title="Attach file">
            <Paperclip size={20} />
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <input
          type="text"
          className="message-input"
          style={{ color: "#000", backgroundColor: "#fff", caretColor: "#000", WebkitTextFillColor: "#000" }}
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            handleTyping();
          }}
        />

        <button
          type="submit"
          className="send-button"
          disabled={!messageText.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

// Status Update Modal Component
const StatusUpdateModal = ({
  chatId,
  projectId,
  onStatusUpdate,
  onClose,
}) => {
  const [newStatus, setNewStatus] = useState("Under Review");
  const [reason, setReason] = useState("");

  const statuses = ["Rejected", "Approved", "Completed", "Under Review"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onStatusUpdate({
      projectId,
      oldStatus: "Under Review", // This should come from project
      newStatus,
      description: reason,
      chatId,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Update Project Status</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Reason/Message:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Add a message for the client..."
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
