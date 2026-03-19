const socketIO = require("socket.io");
const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const AutoReply = require("../model/autoReplyModel");

let connectedUsers = {};
let userSocketMap = {};

const initializeSocket = (server, corsOptions) => {
  const io = socketIO(server, {
    cors: corsOptions,
    transports: ["websocket", "polling"],
  });

  // Middleware for authentication
  io.use((socket, next) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      next();
    } else {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(`User ${userId} connected with socket ID: ${socket.id}`);

    connectedUsers[userId] = true;
    userSocketMap[userId] = socket.id;

    // Emit online status to all connected clients
    io.emit("user_online", { userId, status: "online" });

    // ======================== CHAT EVENTS ========================

    // Join chat room
    socket.on("join_chat", (data) => {
      const { chatId, userId } = data;
      socket.join(`chat_${chatId}`);
      console.log(`User ${userId} joined chat ${chatId}`);

      // Notify others in chat
      io.to(`chat_${chatId}`).emit("user_joined", {
        userId,
        timestamp: new Date(),
      });
    });

    // Leave chat room
    socket.on("leave_chat", (data) => {
      const { chatId, userId } = data;
      socket.leave(`chat_${chatId}`);
      console.log(`User ${userId} left chat ${chatId}`);

      io.to(`chat_${chatId}`).emit("user_left", {
        userId,
        timestamp: new Date(),
      });
    });

    // Receive message
    socket.on("send_message", async (data) => {
      try {
        const {
          chatId,
          senderId,
          messageType,
          content,
          fileUrl,
          fileName,
          imageUrl,
          documentUrl,
          documentName,
        } = data;

        console.log("📨 Received message - ChatID:", chatId, "From:", senderId, "Content:", content);

        // Validate required fields
        if (!chatId || !senderId || !content) {
          console.error("❌ Invalid message data:", data);
          socket.emit("message_error", { error: "Missing required fields" });
          return;
        }

        // Save message to database
        const message = new Message({
          chatId,
          senderId,
          messageType: messageType || "text",
          content,
          fileUrl: fileUrl || null,
          fileName: fileName || null,
          imageUrl: imageUrl || null,
          documentUrl: documentUrl || null,
          documentName: documentName || null,
          readBy: [{ userId: senderId, readAt: new Date() }],
        });

        await message.save();
        console.log("✅ Message saved:", message._id);

        // Update chat
        const chat = await Chat.findByIdAndUpdate(
          chatId,
          {
            lastMessage: message._id,
            lastMessageTime: new Date(),
          },
          { new: true }
        );

        if (!chat) {
          console.error("❌ Chat not found:", chatId);
          return;
        }

        console.log("✅ Chat updated:", chatId);

        // Update unread count
        const otherParticipants = chat.participants.filter(
          (p) => p.toString() !== senderId.toString()
        );

        otherParticipants.forEach((participantId) => {
          const current = chat.unreadCount.get(participantId.toString()) || 0;
          chat.unreadCount.set(participantId.toString(), current + 1);
        });

        await chat.save();

        // Populate message
        const populatedMessage = await message.populate("senderId", "username email profileImage");

        console.log("📤 Broadcasting message to room: chat_" + chatId);

        // Emit message to chat room
        io.to(`chat_${chatId}`).emit("message_received", {
          _id: populatedMessage._id,
          chatId,
          senderId: populatedMessage.senderId,
          messageType: messageType || "text",
          content,
          fileUrl,
          fileName,
          imageUrl,
          documentUrl,
          documentName,
          createdAt: populatedMessage.createdAt,
          readBy: populatedMessage.readBy,
        });

        // For website chat, send auto-reply if configured
        if (chat.chatType === "website" && chat.assignedAdmin) {
          handleAutoReply(chat.assignedAdmin, chatId, content, io);
        }
      } catch (error) {
        console.error("❌ Error sending message:", error);
        socket.emit("message_error", { error: error.message });
      }
    });

    // Typing indicator
    socket.on("typing", (data) => {
      const { chatId, userId } = data;
      io.to(`chat_${chatId}`).emit("user_typing", {
        userId,
        isTyping: true,
      });
    });

    socket.on("stop_typing", (data) => {
      const { chatId, userId } = data;
      io.to(`chat_${chatId}`).emit("user_typing", {
        userId,
        isTyping: false,
      });
    });

    // Mark message as read
    socket.on("message_read", async (data) => {
      try {
        const { messageId, userId } = data;

        await Message.findByIdAndUpdate(messageId, {
          $push: {
            readBy: {
              userId,
              readAt: new Date(),
            },
          },
        });

        const message = await Message.findById(messageId).populate("chatId");

        io.to(`chat_${message.chatId}`).emit("message_read_receipt", {
          messageId,
          userId,
          readAt: new Date(),
        });
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    // Edit message
    socket.on("edit_message", async (data) => {
      try {
        const { messageId, content, senderId, chatId } = data;

        const message = await Message.findByIdAndUpdate(
          messageId,
          {
            content,
            editedAt: new Date(),
            $push: {
              editHistory: {
                content: (await Message.findById(messageId)).content,
                editedAt: new Date(),
              },
            },
          },
          { new: true }
        );

        io.to(`chat_${chatId}`).emit("message_edited", {
          messageId,
          content,
          editedAt: message.editedAt,
        });
      } catch (error) {
        console.error("Error editing message:", error);
      }
    });

    // Delete message
    socket.on("delete_message", async (data) => {
      try {
        const { messageId, chatId } = data;

        await Message.findByIdAndUpdate(messageId, {
          deleted: true,
          content: "[This message was deleted]",
        });

        io.to(`chat_${chatId}`).emit("message_deleted", {
          messageId,
        });
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    });

    // ======================== STATUS UPDATE EVENTS ========================

    // Send status update
    socket.on("send_status_update", async (data) => {
      try {
        const {
          chatId,
          senderId,
          projectId,
          oldStatus,
          newStatus,
          description,
        } = data;

        // Create status update message
        const message = new Message({
          chatId,
          senderId,
          messageType: "status_update",
          content: `Project status updated: ${oldStatus} → ${newStatus}`,
          statusUpdate: {
            projectId,
            oldStatus,
            newStatus,
            description,
          },
          readBy: [{ userId: senderId, readAt: new Date() }],
        });

        await message.save();

        // Emit to chat
        io.to(`chat_${chatId}`).emit("status_update_received", {
          messageId: message._id,
          projectId,
          oldStatus,
          newStatus,
          description,
          timestamp: new Date(),
        });

        // Notify client with system notification
        const chat = await Chat.findById(chatId);
        const clientSocketId = userSocketMap[chat.clientId];

        if (clientSocketId) {
          io.to(clientSocketId).emit("status_notification", {
            title: "Project Status Updated",
            message: `Your project status has been updated to: ${newStatus}`,
            projectId,
            status: newStatus,
          });
        }
      } catch (error) {
        console.error("Error sending status update:", error);
      }
    });

    // ======================== CALL EVENTS ========================

    // Initiate call
    socket.on("initiate_call", (data) => {
      try {
        const { callerId, receiverId, chatId, callType } = data;
        const receiverSocketId = userSocketMap[receiverId];

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("incoming_call", {
            callerId,
            callerSocketId: socket.id,
            chatId,
            callType,
            timestamp: new Date(),
          });
        } else {
          socket.emit("call_failed", {
            message: "Receiver is not online",
          });
        }
      } catch (error) {
        console.error("Error initiating call:", error);
      }
    });

    // Answer call
    socket.on("answer_call", (data) => {
      try {
        const { callerId, receiverId, chatId } = data;
        const callerSocketId = userSocketMap[callerId];

        if (callerSocketId) {
          io.to(callerSocketId).emit("call_answered", {
            receiverId,
            receiverSocketId: socket.id,
            chatId,
          });
        }
      } catch (error) {
        console.error("Error answering call:", error);
      }
    });

    // Reject call
    socket.on("reject_call", (data) => {
      try {
        const { callerId } = data;
        const callerSocketId = userSocketMap[callerId];

        if (callerSocketId) {
          io.to(callerSocketId).emit("call_rejected", {
            message: "Call was rejected",
          });
        }
      } catch (error) {
        console.error("Error rejecting call:", error);
      }
    });

    // End call
    socket.on("end_call", (data) => {
      try {
        const { otherUserId, chatId, callDuration } = data;
        const otherUserSocketId = userSocketMap[otherUserId];

        if (otherUserSocketId) {
          io.to(otherUserSocketId).emit("call_ended", {
            message: "Call ended",
            callDuration,
          });
        }

        io.to(`chat_${chatId}`).emit("call_ended_notification", {
          callDuration,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error ending call:", error);
      }
    });

    // ======================== DISCONNECT EVENT ========================

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);

      delete connectedUsers[userId];
      delete userSocketMap[userId];

      // Emit offline status
      io.emit("user_offline", { userId, status: "offline" });
    });
  });

  return io;
};

// Helper function to handle auto-replies
const handleAutoReply = async (adminId, chatId, userMessage, io) => {
  try {
    const autoReplies = await AutoReply.find({
      adminId,
      isActive: true,
    });

    const lowerMessage = userMessage.toLowerCase();

    for (const autoReply of autoReplies) {
      const triggered = autoReply.triggerKeywords.some((keyword) =>
        lowerMessage.includes(keyword.toLowerCase())
      );

      if (triggered) {
        // Check daily limit
        if (
          autoReply.maxUsesPerDay &&
          autoReply.usageCount >= autoReply.maxUsesPerDay
        ) {
          const lastUsedDate = new Date(autoReply.lastUsedAt);
          const now = new Date();

          if (
            lastUsedDate.toDateString() === now.toDateString() &&
            autoReply.usageCount >= autoReply.maxUsesPerDay
          ) {
            continue; // Skip this auto-reply if limit reached today
          }
        }

        // Send auto-reply with delay
        setTimeout(async () => {
          const autoReplyMessage = new Message({
            chatId,
            senderId: adminId,
            messageType: "text",
            content: autoReply.message,
            readBy: [{ userId: adminId, readAt: new Date() }],
          });

          await autoReplyMessage.save();

          const populatedMessage = await autoReplyMessage.populate("senderId");

          io.to(`chat_${chatId}`).emit("message_received", {
            _id: populatedMessage._id,
            chatId,
            senderId: populatedMessage.senderId,
            messageType: "text",
            content: autoReply.message,
            isAutoReply: true,
            createdAt: populatedMessage.createdAt,
          });

          // Update usage count
          autoReply.usageCount += 1;
          autoReply.lastUsedAt = new Date();
          await autoReply.save();
        }, (autoReply.responseDelay || 0) * 1000);

        break; // Only send one auto-reply
      }
    }
  } catch (error) {
    console.error("Error handling auto-reply:", error);
  }
};

module.exports = {
  initializeSocket,
  connectedUsers,
  userSocketMap,
};
