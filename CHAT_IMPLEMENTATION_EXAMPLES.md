# Chat System - Implementation Examples

## Database Schema Overview

### Chat Collection

```javascript
{
  _id: ObjectId,
  participants: [userId1, userId2], // Users in this chat
  chatType: "website" | "admin_work",
  clientId: userId, // Client who initiated chat
  assignedAdmin: adminId | null,
  projectId: projectId | null, // For admin_work chats
  lastMessage: messageId,
  lastMessageTime: Date,
  unreadCount: {
    userId1: 5,
    userId2: 0
  },
  isActive: true,
  archivedBy: [userId], // Users who archived this
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection

```javascript
{
  _id: ObjectId,
  chatId: chatId,
  senderId: userId,
  messageType: "text" | "file" | "image" | "document" | "call" | "status_update",
  content: "Message text",
  fileUrl: "url" | null,
  fileName: "name" | null,
  imageUrl: "url" | null,
  documentUrl: "url" | null,
  documentName: "name" | null,
  readBy: [
    { userId: userId1, readAt: Date },
    { userId: userId2, readAt: Date }
  ],
  reactions: [
    { userId: userId, emoji: "👍" }
  ],
  deleted: false,
  editedAt: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

### AutoReply Collection

```javascript
{
  _id: ObjectId,
  adminId: userId,
  title: "Greeting",
  message: "Hello! We'll help you soon.",
  category: "greeting" | "faq" | "support" | "custom",
  triggerKeywords: ["hello", "hi", "greetings"],
  responseDelay: 0, // seconds
  maxUsesPerDay: 10 | null,
  usageCount: 5,
  lastUsedAt: Date,
  isActive: true,
  attachments: [
    { url: "file_url", type: "pdf", name: "guide.pdf" }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Usage Examples

### 1. Get User's Chats

**Request:**

```bash
curl -X GET "http://localhost:8003/api/v1/chats/user/userId123" \
  -H "Authorization: Bearer token"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "chat123",
      "clientId": { "username": "John", "email": "john@example.com" },
      "chatType": "website",
      "lastMessage": { "content": "Hello!" },
      "lastMessageTime": "2024-03-14T10:30:00Z"
    }
  ]
}
```

### 2. Send a Message

**Request:**

```bash
curl -X POST "http://localhost:8003/api/v1/messages" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "chat123",
    "senderId": "user456",
    "messageType": "text",
    "content": "How can I help you?"
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "msg789",
    "chatId": "chat123",
    "senderId": { "username": "Admin", "email": "admin@example.com" },
    "messageType": "text",
    "content": "How can I help you?",
    "createdAt": "2024-03-14T10:35:00Z",
    "readBy": [{ "userId": "user456", "readAt": "2024-03-14T10:35:00Z" }]
  }
}
```

### 3. Get Chat Messages

**Request:**

```bash
curl -X GET "http://localhost:8003/api/v1/messages/chat/chat123?limit=50&page=1" \
  -H "Authorization: Bearer token"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "msg1",
      "senderId": { "username": "User", "email": "user@example.com" },
      "content": "Hi there!",
      "createdAt": "2024-03-14T10:00:00Z"
    },
    {
      "_id": "msg2",
      "senderId": { "username": "Admin", "email": "admin@example.com" },
      "content": "Hello! How can I assist?",
      "createdAt": "2024-03-14T10:05:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 2,
    "pages": 1
  }
}
```

### 4. Create Auto-Reply

**Request:**

```bash
curl -X POST "http://localhost:8003/api/v1/auto-replies" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "adminId": "admin123",
    "title": "After Hours",
    "message": "We are currently offline. We'll respond to you as soon as possible!",
    "category": "custom",
    "triggerKeywords": ["time", "hours", "open"],
    "responseDelay": 1,
    "maxUsesPerDay": null,
    "isActive": true
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "autoreply123",
    "adminId": "admin123",
    "title": "After Hours",
    "message": "We are currently offline...",
    "isActive": true
  },
  "message": "Auto-reply created successfully"
}
```

### 5. Get Unread Count

**Request:**

```bash
curl -X GET "http://localhost:8003/api/v1/chats/unread/userId123" \
  -H "Authorization: Bearer token"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalUnread": 5,
    "unreadByChat": {
      "chat123": 3,
      "chat456": 2
    }
  }
}
```

---

## Socket.io Event Examples

### Client Sending Message

```javascript
// Frontend (React/Next.js)
socketRef.current.emit("send_message", {
  chatId: "chat123",
  senderId: "user456",
  messageType: "text",
  content: "Hello, how are you?",
});

// Backend receives and broadcasts
socket.on("send_message", async (data) => {
  // Save to DB
  // Broadcast to recipients
  io.to(`chat_${data.chatId}`).emit("message_received", {
    _id: message._id,
    chatId: data.chatId,
    senderId: senderData,
    content: data.content,
    createdAt: new Date(),
  });
});
```

### Receiving Message

```javascript
// Frontend listener
socketRef.current.on("message_received", (message) => {
  setMessages((prev) => [...prev, message]);

  // Update unread count if not sender
  if (message.senderId !== currentUserId) {
    setUnreadCount((prev) => prev + 1);
  }
});
```

### Status Update

```javascript
// Admin sends status update
socketRef.current.emit("send_status_update", {
  chatId: "chat123",
  senderId: "admin456",
  projectId: "project789",
  oldStatus: "Under Review",
  newStatus: "Approved",
  description: "Your project has been approved!",
});

// Client receives notification
socketRef.current.on("status_notification", (notification) => {
  console.log(notification);
  // Output: {
  //   title: "Project Status Updated",
  //   message: "Your project status has been updated to: Approved",
  //   projectId: "project789",
  //   status: "Approved"
  // }

  // Show toast/alert to user
  showNotification(notification);
});
```

### Typing Indicator

```javascript
// User starts typing
socketRef.current.emit("typing", {
  chatId: "chat123",
  userId: "user456",
});

// Other users see typing indicator
socketRef.current.on("user_typing", (data) => {
  if (data.isTyping) {
    setShowTypingIndicator(true);
  } else {
    setShowTypingIndicator(false);
  }
});

// User stops typing after 3 seconds
socketRef.current.emit("stop_typing", {
  chatId: "chat123",
  userId: "user456",
});
```

### Voice/Video Call

```javascript
// Initiate call
socketRef.current.emit("initiate_call", {
  callerId: "user123",
  receiverId: "user456",
  chatId: "chat789",
  callType: "voice", // or 'video'
});

// Receiver gets notification
socketRef.current.on("incoming_call", (data) => {
  // Show incoming call modal
  showIncomingCallModal({
    from: data.callerId,
    type: data.callType,
  });
});

// Receiver answers
socketRef.current.emit("answer_call", {
  callerId: "user123",
  receiverId: "user456",
  chatId: "chat789",
});

// Caller receives answer
socketRef.current.on("call_answered", (data) => {
  // Start call connection
  connectCall(data.receiverSocketId);
});

// End call
socketRef.current.emit("end_call", {
  otherUserId: "user456",
  chatId: "chat789",
  callDuration: 300, // seconds
});
```

---

## React Admin Panel Usage

### Complete Chat Component Integration

```jsx
import React, { useState, useEffect } from "react";
import ChatContainer from "./components/Chat/ChatContainer";

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from auth
    const user = localStorage.getItem("userData");
    setCurrentUser(JSON.parse(user));
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Chat System */}
      <ChatContainer
        userId={currentUser._id}
        adminId={currentUser._id}
        userRole="admin"
      />
    </div>
  );
}
```

### Setup Auto-Reply

```jsx
import AutoReplySettings from "./components/Chat/AutoReplySettings";

function AutoReplyPage() {
  const adminId = localStorage.getItem("userId");

  return (
    <AutoReplySettings
      adminId={adminId}
      onClose={() => console.log("Closed")}
    />
  );
}
```

---

## Next.js Client Portal Usage

### Add Chat to Layout

```jsx
// app/layout.jsx
"use client";

import ClientChatButton from "@/components/Chat/ClientChatButton";
import { useSession } from "next-auth/react";

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();

  return (
    <html>
      <body>
        {children}

        {status === "authenticated" && session?.user?.id && (
          <ClientChatButton
            userId={session.user.id}
            userName={session.user.name}
            userEmail={session.user.email}
            userProfileImage={session.user.image}
          />
        )}
      </body>
    </html>
  );
}
```

### Accessing Chat in Portal

```jsx
export default function ClientPortal() {
  return (
    <main>
      {/* Your portal content */}
      <h1>Client Portal</h1>

      {/* Chat button will appear automatically */}
    </main>
  );
}
```

---

## Authentication with Chat

### Middleware to Protect Routes

```javascript
// middleware/authMiddleware.js
const authMiddleware = {
  protect: (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  },
};

module.exports = authMiddleware;
```

### Using in Routes

```javascript
// routes/chatRoutes.js
const express = require("express");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all chat routes
router.use(authMiddleware.protect);

router.get("/user/:userId", chatController.getUserChats);
router.post("/", chatController.createChat);
// ... more routes

module.exports = router;
```

---

## Environment Setup

### Backend (.env)

```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/chatdb
FRONTEND_URL=http://localhost:3000
PORT=8003
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Admin (.env)

```
REACT_APP_API_URL=http://localhost:8003
```

### Client (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8003
```

---

## Testing Workflow

### 1. Create Chat (Client Side)

```javascript
// User clicks chat button
// Chat component calls:
const response = await fetch("/api/v1/chats", {
  method: "POST",
  body: JSON.stringify({
    clientId: "user123",
    chatType: "website",
  }),
});
// Creates new chat
```

### 2. Admin Receives Chat

```javascript
// Admin opens chat panel
// Component fetches all chats:
const chats = await fetch("/api/v1/chats/user/admin456");
// Shows in chat list with unread badge
```

### 3. Exchange Messages

```javascript
// Client sends message via socket
socket.emit("send_message", {
  chatId: "chat123",
  senderId: "user123",
  messageType: "text",
  content: "Need help!",
});

// Admin receives in real-time
socket.on("message_received", (message) => {
  // Display in chat
});

// Admin sends auto-reply
socket.emit("send_message", {
  chatId: "chat123",
  senderId: "admin456",
  messageType: "text",
  content: "Hello! How can we assist?", // Could be auto-reply
});
```

### 4. Project Status Update

```javascript
// Admin updates project status
socket.emit("send_status_update", {
  chatId: "chat123",
  projectId: "proj123",
  newStatus: "Approved",
});

// Client's notification appears
socket.on("status_notification", (notification) => {
  // Show success message
});
```

---

## Performance Tips

1. **Message Pagination**: Load messages in chunks of 50
2. **Socket Optimization**: Use room-based broadcasting
3. **Database Indexing**: Add indexes on frequently queried fields
4. **Compression**: Enable gzip compression
5. **Caching**: Cache chat list data
6. **Lazy Loading**: Load avatars and images lazily

---

## Error Handling

```javascript
// Socket error handling
socket.on("message_error", (error) => {
  console.error("Message error:", error.message);
  showErrorToast("Failed to send message");
});

socket.on("call_failed", (data) => {
  console.error("Call failed:", data.message);
  showErrorToast(data.message);
});

// API error handling
const response = await fetch(url);
if (!response.ok) {
  const error = await response.json();
  console.error("API Error:", error);
  throw new Error(error.message);
}
```

---

**This document provides complete implementation examples. Refer to CHAT_SYSTEM_GUIDE.md for detailed documentation.**
