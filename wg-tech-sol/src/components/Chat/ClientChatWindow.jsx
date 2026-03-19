import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, CheckCheck, Check } from "lucide-react";
import "./ClientChatWindow.css";

const ClientChatWindow = ({
  chatId,
  userId,
  messages,
  onSendMessage,
  socketRef,
}) => {
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
      socketRef?.emit("typing", { chatId, userId });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketRef?.emit("stop_typing", { chatId, userId });
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

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="client-chat-window">
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          fontSize: '11px',
          padding: '8px',
          backgroundColor: '#f0f0f0',
          borderBottom: '1px solid #ddd',
          maxHeight: '40px',
          overflow: 'auto',
          color: '#666'
        }}>
          🔧 Debug: chatId={chatId?.substring(0, 8)}... userId={userId?.substring(0, 8)}... msgs={messages.length} socket={socketRef?.connected ? '✅' : '❌'}
        </div>
      )}
      
      {/* Messages */}
      <div className="client-messages-container">
        {messages && messages.length > 0 ? (
          <div className="client-messages-list">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`client-message ${
                  (message.senderId?._id || message.senderId) === userId ? "own" : "other"
                }`}
              >
                {message.messageType === "status_update" && (
                  <div className="status-notification">
                    <p>
                      Project status updated to:{" "}
                      <strong>{message.statusUpdate?.newStatus}</strong>
                    </p>
                    {message.statusUpdate?.description && (
                      <p>{message.statusUpdate.description}</p>
                    )}
                  </div>
                )}

                {message.messageType === "text" && (
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {formatTime(message.createdAt)}
                      {(message.senderId?._id || message.senderId) === userId && (
                        <span className="read-status">
                          {message.readBy?.length > 1 ? (
                            <CheckCheck size={12} />
                          ) : (
                            <Check size={12} />
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="empty-chat-messages">
            <p>👋 Hello! How can we help you today?</p>
          </div>
        )}
      </div>

      {/* Input */}
      <form className="client-message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="client-message-input"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            handleTyping();
          }}
        />
        <button
          type="submit"
          className="client-send-button"
          disabled={!messageText.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ClientChatWindow;
