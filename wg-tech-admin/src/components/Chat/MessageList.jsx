import React from "react";
import { CheckCheck, Check } from "lucide-react";
import "./MessageList.css";

const MessageList = ({ messages, userId }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  let lastDate = null;

  return (
    <div className="messages-list">
      {messages.map((message, index) => {
        const messageDate = formatDate(message.createdAt);
        const showDateDivider = lastDate !== messageDate;
        lastDate = messageDate;

        const isOwnMessage = message.senderId._id === userId;

        const safeKey = message._id ? `${message._id}-${index}` : `msg-${index}`;

        return (
          <div key={safeKey}>
            {showDateDivider && (
              <div className="date-divider">
                <span>{messageDate}</span>
              </div>
            )}

            {message.messageType === "status_update" ? (
              <div className="status-update-message">
                <div className="status-badge">
                  <span className="status-old">
                    {message.statusUpdate?.oldStatus}
                  </span>
                  <span className="status-arrow">→</span>
                  <span className="status-new">
                    {message.statusUpdate?.newStatus}
                  </span>
                </div>
                {message.statusUpdate?.description && (
                  <p className="status-description">
                    {message.statusUpdate.description}
                  </p>
                )}
                <span className="message-time">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            ) : (
              <div
                className={`message ${isOwnMessage ? "own-message" : "other-message"}`}
              >
                {!isOwnMessage && (
                  <div className="message-avatar">
                    {message.senderId?.profileImage ? (
                      <img src={message.senderId.profileImage} alt="Sender" />
                    ) : (
                      <div className="avatar-placeholder">
                        {message.senderId?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                )}

                <div className="message-content">
                  {message.messageType === "text" && (
                    <div className={`message-bubble ${isOwnMessage ? "own" : "other"}`}>
                      <p>{message.content}</p>
                      {message.editedAt && (
                        <span className="edited-indicator">(edited)</span>
                      )}
                    </div>
                  )}

                  {message.messageType === "image" && (
                    <div className="message-image">
                      <img src={message.imageUrl} alt="Shared" />
                    </div>
                  )}

                  {message.messageType === "document" && (
                    <div className="message-document">
                      <a href={message.documentUrl} download>
                        📄 {message.documentName || "Document"}
                      </a>
                    </div>
                  )}

                  {message.messageType === "file" && (
                    <div className="message-file">
                      <a href={message.fileUrl} download>
                        📎 {message.fileName}
                      </a>
                    </div>
                  )}

                  <div className="message-footer">
                    <span className="message-time">
                      {formatTime(message.createdAt)}
                    </span>
                    {isOwnMessage && (
                      <span className="read-status">
                        {message.readBy?.length > 1 ? (
                          <CheckCheck size={16} />
                        ) : (
                          <Check size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
