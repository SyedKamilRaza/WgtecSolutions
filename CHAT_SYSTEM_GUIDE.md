# WhatsApp-like Chat System Implementation Guide

## Overview

A complete real-time chat system with WhatsApp-like UI/UX, featuring:

- Real-time messaging with WebSocket support
- Two separate chat sections (Website Support & Admin Work)
- Auto-reply functionality for helpline representatives
- Project status synchronization
- File sharing and voice/video call capabilities
- Unread message badges
- Fully responsive design

## Backend Setup

### 1. Install Dependencies

```bash
cd wgtech-backend
npm install socket.io express-session
```

Add to `package.json`:

```json
"socket.io": "^4.6.0",
"express-session": "^1.17.3"
```

### 2. Database Models

Created models:

- **chatModel.js** - Chat conversations/rooms
- **messageModel.js** - Individual messages with read receipts
- **autoReplyModel.js** - Auto-reply templates
- **projectStatusModel.js** - Project status tracking

### 3. Controllers & Routes

**Controllers:**

- `controllers/chatController.js` - Chat operations
- `controllers/messageController.js` - Message handling
- `controllers/autoReplyController.js` - Auto-reply management

**Routes:**

- `GET /api/v1/chats/user/:userId` - Get user's chats
- `GET /api/v1/chats/:chatId` - Get single chat
- `POST /api/v1/chats` - Create chat
- `PUT /api/v1/chats/assign-admin` - Assign admin
- `GET /api/v1/chats/unread/:userId` - Get unread count
- `POST /api/v1/messages` - Send message
- `GET /api/v1/messages/chat/:chatId` - Get messages
- `PUT /api/v1/messages/:messageId` - Edit message
- `DELETE /api/v1/messages/:messageId` - Delete message
- `POST /api/v1/auto-replies` - Create auto-reply
- `GET /api/v1/auto-replies/admin/:adminId` - Get auto-replies
- `PATCH /api/v1/auto-replies/:autoReplyId/toggle` - Toggle auto-reply

### 4. WebSocket Setup

The socket service in `utils/socketService.js` handles:

- Real-time messaging
- Typing indicators
- Read receipts
- Call signaling (voice/video)
- Status updates
- Auto-reply triggers

### 5. Environment Variables

Add to `.env`:

```
DATABASE_URL=mongodb://your_connection_string
FRONTEND_URL=http://localhost:3000
PORT=8003
NODE_ENV=development
```

## Admin Panel (React) Integration

### 1. Install Dependencies

```bash
cd wg-tech-admin
npm install socket.io-client
```

### 2. Add Components

Components created in `src/components/Chat/`:

- `ChatContainer.jsx` - Main chat component
- `ChatSidebar.jsx` - Chat list
- `ChatWindow.jsx` - Main chat interface
- `MessageList.jsx` - Message display
- `AutoReplySettings.jsx` - Auto-reply configuration
- `ProjectStatusIndicator.jsx` - Status display
- `NotificationBadge.jsx` - Unread badge

### 3. Usage in Admin Dashboard

```jsx
import ChatContainer from "./components/Chat/ChatContainer";

function AdminPage() {
  return (
    <ChatContainer
      userId={currentUserId}
      adminId={currentAdminId}
      userRole="admin"
    />
  );
}
```

### 4. Environment Setup

Add to `.env`:

```
REACT_APP_API_URL=http://localhost:8003
```

## Client Portal (Next.js) Integration

### 1. Install Dependencies

```bash
cd wg-tech-sol
npm install socket.io-client
```

### 2. Add Chat Button

Components created in `src/components/Chat/`:

- `ClientChatButton.jsx` - Floating chat button
- `ClientChatWindow.jsx` - Chat interface

### 3. Usage in Layout

```jsx
import ClientChatButton from "@/components/Chat/ClientChatButton";

export default function RootLayout() {
  const { userId, userName, userEmail } = useAuth();

  return (
    <html>
      <body>
        {userId && (
          <ClientChatButton
            userId={userId}
            userName={userName}
            userEmail={userEmail}
          />
        )}
      </body>
    </html>
  );
}
```

### 4. Environment Setup

Add to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8003
```

## Features Explained

### 1. Two Chat Sections

**Website Chat:**

- `chatType: "website"`
- For general inquiries
- Helpline representative can set auto-replies
- Available to all users

**Admin Work Chat:**

- `chatType: "admin_work"`
- Project-related communication
- Only for logged-in clients
- Synced between client and admin

### 2. Auto-Reply System

Create auto-replies with:

- Trigger keywords
- Response delay
- Category (greeting, FAQ, support, custom)
- Daily usage limits
- Active/inactive toggle

Example:

```javascript
{
  title: "Greeting",
  message: "Hello! Thanks for contacting us. We'll be with you shortly!",
  triggerKeywords: ["hello", "hi", "greetings"],
  responseDelay: 2,
  maxUsesPerDay: 10,
  isActive: true
}
```

### 3. Project Status Updates

Automatically sends status change notifications:

- Rejected
- Approved
- Completed
- Under Review

Status updates appear in chat and notify clients.

### 4. Real-time Synchronization

Socket events:

- `send_message` - Send message
- `message_received` - Receive message
- `message_read` - Mark as read
- `typing` / `stop_typing` - Typing indicators
- `edit_message` - Edit sent message
- `delete_message` - Delete message
- `send_status_update` - Update project status
- `initiate_call` - Start call
- `answer_call` - Accept call
- `end_call` - End call

### 5. Unread Notifications

- Badge shows total unread count
- Per-chat unread count tracking
- Auto-clear when chat is opened
- Updates in real-time

## WebSocket Events Reference

### Client Events (Sent from frontend)

```javascript
// Messaging
socket.emit("send_message", {
  chatId,
  senderId,
  messageType,
  content,
  fileUrl,
  fileName,
  imageUrl,
  documentUrl,
});

socket.emit("message_read", { messageId, userId });
socket.emit("edit_message", { messageId, content, senderId, chatId });
socket.emit("delete_message", { messageId, chatId });

// Typing
socket.emit("typing", { chatId, userId });
socket.emit("stop_typing", { chatId, userId });

// Calls
socket.emit("initiate_call", { callerId, receiverId, chatId, callType });
socket.emit("answer_call", { callerId, receiverId, chatId });
socket.emit("reject_call", { callerId });
socket.emit("end_call", { otherUserId, chatId, callDuration });

// Status Update
socket.emit("send_status_update", {
  chatId,
  senderId,
  projectId,
  oldStatus,
  newStatus,
  description,
});

// Chat Management
socket.emit("join_chat", { chatId, userId });
socket.emit("leave_chat", { chatId, userId });
```

### Server Events (Received on frontend)

```javascript
socket.on("user_online", { userId, status });
socket.on("user_offline", { userId, status });
socket.on("user_joined", { userId, timestamp });
socket.on("user_left", { userId, timestamp });
socket.on("message_received", message);
socket.on("message_read_receipt", { messageId, userId, readAt });
socket.on("message_edited", { messageId, content, editedAt });
socket.on("message_deleted", { messageId });
socket.on("user_typing", { userId, isTyping });
socket.on("status_update_received", statusData);
socket.on("status_notification", notification);
socket.on("incoming_call", { callerId, callerSocketId, chatId, callType });
socket.on("call_answered", { receiverId, receiverSocketId, chatId });
socket.on("call_rejected", { message });
socket.on("call_ended", { message, callDuration });
```

## API Endpoints Summary

### Chat Endpoints

```
GET    /api/v1/chats/user/:userId
GET    /api/v1/chats/:chatId
POST   /api/v1/chats
PUT    /api/v1/chats/assign-admin
GET    /api/v1/chats/unread/:userId
PUT    /api/v1/chats/:chatId/archive
GET    /api/v1/chats/archived/:userId
```

### Message Endpoints

```
POST   /api/v1/messages
GET    /api/v1/messages/chat/:chatId
PUT    /api/v1/messages/:messageId
DELETE /api/v1/messages/:messageId
POST   /api/v1/messages/:messageId/reaction
DELETE /api/v1/messages/:messageId/reaction
POST   /api/v1/messages/read
POST   /api/v1/messages/status-update
```

### Auto-Reply Endpoints

```
POST   /api/v1/auto-replies
GET    /api/v1/auto-replies/admin/:adminId
GET    /api/v1/auto-replies/:autoReplyId
PUT    /api/v1/auto-replies/:autoReplyId
DELETE /api/v1/auto-replies/:autoReplyId
PATCH  /api/v1/auto-replies/:autoReplyId/toggle
GET    /api/v1/auto-replies/keyword (query: keyword, adminId)
```

## Responsive Design

All components are fully responsive:

- **Desktop**: Full-width chat layout
- **Tablet**: Adaptive sidebar
- **Mobile**: Single-column chat
- **Chat Button**: Fixed position, mobile-optimized

CSS breakpoints:

- `768px` - Tablet
- `480px` - Mobile

## Security Considerations

1. **Authentication**: All routes protected with `authMiddleware.protect`
2. **Input Validation**: Use `express-validator` for request validation
3. **Rate Limiting**: Implement for socket connections
4. **CORS**: Configure properly in Socket.io
5. **Data Sanitization**: XSS protection enabled

## Testing the System

### 1. Start Backend

```bash
cd wgtech-backend
npm run dev
```

### 2. Start Admin Panel

```bash
cd wg-tech-admin
npm run dev
```

### 3. Start Client Portal

```bash
cd wg-tech-sol
npm run dev
```

### 4. Test Chat Flow

1. Login as admin
2. Open chat in admin panel
3. Login as client
4. Click chat button
5. Send message from client
6. Verify message appears in admin
7. Admin sends auto-reply
8. Test status update
9. Verify synchronization

## Troubleshooting

### Socket Connection Issues

- Check CORS settings in server.js
- Verify Socket.io package installed
- Check browser console for errors

### Messages Not Sending

- Verify chat ID is correct
- Check authentication token
- Ensure both users are connected

### Auto-Reply Not Working

- Verify auto-reply is active
- Check trigger keywords
- Ensure admin has auto-reply set up
- Check response delay

### Unread Count Not Updating

- Verify unreadCount in Chat model
- Check socket events firing
- Clear browser cache

## Future Enhancements

1. Message encryption (end-to-end)
2. Voice/Video call implementation
3. Message reactions (emojis)
4. Media uploads to cloud storage
5. Chat translation
6. Chat search functionality
7. Chat export to PDF
8. Chatbot integration
9. Conversation context AI
10. Advanced analytics

## Support

For issues or questions, contact the development team.

---

**Last Updated**: March 2026
**Version**: 1.0.0
