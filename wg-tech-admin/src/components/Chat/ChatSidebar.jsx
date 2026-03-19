import React from "react";
import { MessageSquare, Settings } from "lucide-react";
import "./ChatSidebar.css";

const ChatSidebar = ({
  chats,
  selectedChat,
  onSelectChat,
  unreadCount,
  onlineUsers,
  onShowAutoReply,
  userRole,
}) => {
  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h2>Chats</h2>
        {userRole === "admin" && (
          <button
            className="auto-reply-btn"
            onClick={onShowAutoReply}
            title="Auto Reply Settings"
          >
            <Settings size={20} />
          </button>
        )}
      </div>

      <div className="chat-search">
        <input
          type="text"
          placeholder="Search chats..."
          className="search-input"
        />
      </div>

      <div className="chat-list">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`chat-item ${selectedChat?._id === chat._id ? "active" : ""}`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="chat-avatar">
                {chat.clientId?.profileImage ? (
                  <img src={chat.clientId.profileImage} alt="Chat" />
                ) : (
                  <div className="avatar-placeholder">
                    {chat.clientId?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                {onlineUsers[chat.clientId?._id] === "online" && (
                  <span className="online-indicator"></span>
                )}
              </div>

              <div className="chat-info">
                <div className="chat-header-row">
                  <h3 className="chat-name">{chat.clientId?.username}</h3>
                  <span className="chat-type">{chat.chatType}</span>
                </div>
                <p className="chat-preview">
                  {chat.lastMessage?.content || "No messages yet"}
                </p>
              </div>

              {unreadCount[chat._id] > 0 && (
                <span className="unread-badge">
                  {unreadCount[chat._id]}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="empty-chats">
            <MessageSquare size={40} />
            <p>No chats yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
