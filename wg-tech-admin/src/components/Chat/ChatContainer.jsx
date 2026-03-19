import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import AutoReplySettings from "./AutoReplySettings";
import NotificationBadge from "./NotificationBadge";
import "./ChatContainer.css";

const ChatContainer = ({ userId, adminId, userRole }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState({});
  const [totalUnread, setTotalUnread] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [showAutoReply, setShowAutoReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  // Initialize Socket.io connection
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(import.meta.env.VITE_API_URL || "http://localhost:8003", {
      query: { userId },
      transports: ["websocket", "polling"],
      reconnect: true,
      reconnectDelay: 1000,
      reconnectDelayMax: 5000,
      reconnectAttempts: 5,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    socketRef.current.on("user_online", (data) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [data.userId]: "online",
      }));
    });

    socketRef.current.on("user_offline", (data) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [data.userId]: "offline",
      }));
    });

    socketRef.current.on("message_received", (message) => {
      console.log("📨 Message received on admin:", message);
      
      // Deduplicate: only add if message doesn't already exist
      setMessages((prev) => {
        const messageExists = prev.some((msg) => msg._id === message._id);
        if (messageExists) {
          console.log("⚠️ Message already exists, skipping duplicate:", message._id);
          return prev;
        }
        return [...prev, message];
      });
      
      // Update unread count
      if (selectedChat && message.chatId === selectedChat._id) {
        // Mark as read
        fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/messages/${message._id}/mark-read`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).catch(err => console.error("Error marking message as read:", err));
      }
    });

    socketRef.current.on("status_notification", (notification) => {
      console.log("📢 Status notification:", notification);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, selectedChat]);

  // Fetch chats
  useEffect(() => {
    if (!userId) return;

    const fetchChats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/chats/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setChats(data.data);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [userId]);

  // Fetch unread count
  useEffect(() => {
    if (!userId) return;

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/chats/unread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setUnreadCount(data.data.unreadByChat);
          setTotalUnread(data.data.totalUnread);
        }
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);

  // Fetch messages for selected chat
  const fetchMessages = async (chatId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8003"}/api/v1/messages/chat/${chatId}?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
      
      // Join chat room
      if (socketRef.current) {
        socketRef.current.emit("join_chat", { chatId, userId });
        console.log("Joined chat room:", chatId);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat._id);
  };

  const handleSendMessage = (messageData) => {
    if (!selectedChat || !userId) {
      console.error("Cannot send message: missing chat or user", {
        selectedChat: selectedChat ? selectedChat._id : "missing",
        userId: userId || "missing",
      });
      return;
    }
    
    if (!socketRef.current?.connected) {
      console.error("Socket not connected, cannot send message");
      alert("Chat connection lost. Please refresh the page.");
      return;
    }
    
    const payload = {
      ...messageData,
      chatId: selectedChat._id,
      senderId: userId,
    };
    
    console.log("📤 Sending message from admin:", payload);
    socketRef.current.emit("send_message", payload, (response) => {
      console.log("📨 Admin message sent response:", response);
    });
  };

  const handleStatusUpdate = (statusData) => {
    socketRef.current?.emit("send_status_update", {
      ...statusData,
      chatId: selectedChat._id,
      senderId: userId,
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-notification-badge">
        <NotificationBadge count={totalUnread} />
      </div>

      <div className="chat-layout">
        <ChatSidebar
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          unreadCount={unreadCount}
          onlineUsers={onlineUsers}
          onShowAutoReply={() => setShowAutoReply(true)}
          userRole={userRole}
        />

        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            userId={userId}
            onSendMessage={handleSendMessage}
            onStatusUpdate={handleStatusUpdate}
            loading={loading}
            socketRef={socketRef.current}
          />
        ) : (
          <div className="chat-empty-state">
            <h2>Select a conversation to start chatting</h2>
          </div>
        )}
      </div>

      {showAutoReply && userRole === "admin" && (
        <AutoReplySettings
          adminId={adminId}
          onClose={() => setShowAutoReply(false)}
        />
      )}
    </div>
  );
};

export default ChatContainer;
