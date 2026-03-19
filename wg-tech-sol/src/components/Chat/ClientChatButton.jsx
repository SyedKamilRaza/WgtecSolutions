import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { MessageCircle, X } from "lucide-react";
import ClientChatWindow from "./ClientChatWindow";
import "./ClientChatButton.css";

const ClientChatButton = ({ userId, userName, userEmail, userProfileImage }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const socketRef = useRef(null);

  // Initialize Socket.io
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003", {
      query: { userId },
      transports: ["websocket", "polling"],
      reconnect: true,
      reconnectDelay: 1000,
      reconnectDelayMax: 5000,
      reconnectAttempts: 5,
    });

    // Connection events
    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    socketRef.current.on("message_error", (error) => {
      console.error("❌ Message error:", error);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  // Fetch or create chat
  const initializeChat = async () => {
    if (chatId) return;

    try {
      setIsLoading(true);

      // Check if chat exists
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"}/api/v1/chats/user/${userId}?chatType=website`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      let chat = data.data?.[0];

      if (!chat) {
        // Create new chat
        const createResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"}/api/v1/chats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
              clientId: userId,
              chatType: "website",
            }),
          }
        );

        const createData = await createResponse.json();
        
        if (!createData.success || !createData.data) {
          console.error("Failed to create chat:", {
            status: createResponse.status,
            response: createData,
            token: localStorage.getItem("token") ? "exists" : "missing",
            userId
          });
          setIsLoading(false);
          return;
        }

        chat = createData.data;
      }

      if (!chat || !chat._id) {
        console.error("Chat object invalid:", chat);
        setIsLoading(false);
        return;
      }

      setChatId(chat._id);

      // Fetch messages
      const messagesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"}/api/v1/messages/chat/${chat._id}?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const messagesData = await messagesResponse.json();
      if (messagesData.success) {
        setMessages(messagesData.data);
        console.log("✅ Messages fetched:", messagesData.data.length);
      }

      // Join chat room - wait for socket to be ready
      const joinRoom = () => {
        if (socketRef.current) {
          console.log("🔗 Joining chat room:", chat._id, "with userId:", userId);
          socketRef.current.emit("join_chat", { chatId: chat._id, userId });
        } else {
          console.error("❌ Socket not ready when joining chat");
        }
      };

      // Try to join immediately or wait for connection
      if (socketRef.current?.connected) {
        joinRoom();
      } else {
        console.log("⏳ Waiting for socket connection before joining room...");
        // Wait for connection
        setTimeout(joinRoom, 1000);
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChat = async () => {
    console.log("📂 Opening chat...");
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    
    if (!chatId) {
      console.log("📂 No existing chat, initializing...");
      await initializeChat();
    } else {
      console.log("📂 Using existing chatId:", chatId);
    }
  };

  const handleSendMessage = (messageData) => {
    console.log("🚀 handleSendMessage called with:", {
      messageData,
      chatId,
      userId,
      socketConnected: socketRef.current?.connected,
    });

    if (!chatId || !userId) {
      console.error("Cannot send message:", {
        chatId: chatId || "missing",
        userId: userId || "missing",
        messageData,
        socketConnected: socketRef.current?.connected,
      });
      return;
    }

    if (!socketRef.current?.connected) {
      console.error("Socket not connected, cannot send message");
      alert("Chat connection lost. Please Try refreshing the page.");
      return;
    }
    
    const payload = {
      ...messageData,
      chatId,
      senderId: userId,
    };
    
    console.log("📤 Sending message:", payload);
    
    // Optimistically add message to UI immediately
    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      chatId,
      senderId: userId,
      messageType: "text",
      content: messageData.content,
      createdAt: new Date(),
      readBy: [{ userId, readAt: new Date() }],
    };
    
    setMessages((prev) => [...prev, optimisticMessage]);
    console.log("✨ Message added optimistically to UI");
    
    socketRef.current.emit("send_message", payload, (response) => {
      console.log("📨 Message sent response:", response);
    });
  };

  // Listen for incoming messages
  useEffect(() => {
    socketRef.current?.on("message_received", (message) => {
      console.log("📨 Message received:", message);
      
      // Deduplicate and replace optimistic messages
      setMessages((prev) => {
        // Check if message already exists (by real _id)
        const messageExists = prev.some((msg) => msg._id === message._id && !msg._id.startsWith("temp-"));
        if (messageExists) {
          console.log("⚠️ Message already exists, skipping duplicate:", message._id);
          return prev;
        }
        
        // Remove optimistic message if this is the confirmed version
        if (!message._id.startsWith("temp-")) {
          const filtered = prev.filter((msg) => !msg._id.startsWith("temp-"));
          return [...filtered, message];
        }
        
        return [...prev, message];
      });

      // Update unread count only if message not from current user
      if (message.senderId?._id !== userId && message.senderId !== userId) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      socketRef.current?.off("message_received");
    };
  }, [userId]);

  // Clear unread when chat is open
  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  return (
    <>
      {!isChatOpen && (
        <button
          className="chat-button"
          onClick={handleOpenChat}
          title="Open chat"
        >
          <MessageCircle size={24} />
          {unreadCount > 0 && (
            <span className="chat-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
          )}
        </button>
      )}

      {isChatOpen && (
        <div className="chat-modal">
          <div className="chat-modal-header">
            <h3>Chat with Support</h3>
            <button
              className="close-chat-btn"
              onClick={() => setIsChatOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {isLoading ? (
            <div className="chat-loading">
              <p>Loading chat...</p>
            </div>
          ) : (
            <ClientChatWindow
              chatId={chatId}
              userId={userId}
              messages={messages}
              onSendMessage={handleSendMessage}
              socketRef={socketRef.current}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ClientChatButton;
