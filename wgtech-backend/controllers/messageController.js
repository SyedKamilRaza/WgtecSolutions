const Message = require("../model/messageModel");
const Chat = require("../model/chatModel");
const AutoReply = require("../model/autoReplyModel");
const ProjectStatus = require("../model/projectStatusModel");
const User = require("../model/userModel");

// Send message
exports.sendMessage = async (req, res) => {
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
    } = req.body;

    const message = new Message({
      chatId,
      senderId,
      messageType,
      content,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      imageUrl: imageUrl || null,
      documentUrl: documentUrl || null,
      documentName: documentName || null,
      readBy: [{ userId: senderId, readAt: new Date() }],
    });

    await message.save();

    // Update chat's last message
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        lastMessage: message._id,
        lastMessageTime: new Date(),
      },
      { new: true }
    );

    // Update unread count for all other participants
    const otherParticipants = chat.participants.filter(
      (p) => p.toString() !== senderId.toString()
    );

    otherParticipants.forEach((participantId) => {
      const current = chat.unreadCount.get(participantId.toString()) || 0;
      chat.unreadCount.set(participantId.toString(), current + 1);
    });

    await chat.save();

    const populatedMessage = await message.populate("senderId", "username email profileImage");

    res.status(201).json({
      success: true,
      data: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get messages for chat
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      chatId,
      deleted: false,
    })
      .populate("senderId", "username email profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const total = await Message.countDocuments({
      chatId,
      deleted: false,
    });

    res.status(200).json({
      success: true,
      data: messages.reverse(),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit message
exports.editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content, senderId } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to edit this message",
      });
    }

    // Add to edit history
    message.editHistory.push({
      content: message.content,
      editedAt: message.updatedAt,
    });

    message.content = content;
    message.editedAt = new Date();

    await message.save();

    const populatedMessage = await message.populate("senderId", "username email profileImage");

    res.status(200).json({
      success: true,
      data: populatedMessage,
      message: "Message edited successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { senderId } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this message",
      });
    }

    message.deleted = true;
    message.content = "[This message was deleted]";
    await message.save();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add reaction to message
exports.addReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, emoji } = req.body;

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $push: {
          reactions: {
            userId,
            emoji,
          },
        },
      },
      { new: true }
    ).populate("senderId", "username email profileImage");

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove reaction from message
exports.removeReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.body;

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $pull: {
          reactions: {
            userId,
          },
        },
      },
      { new: true }
    ).populate("senderId", "username email profileImage");

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    await Message.updateMany(
      {
        chatId,
        senderId: { $ne: userId },
        readBy: { $not: { $elemMatch: { userId } } },
      },
      {
        $push: {
          readBy: {
            userId,
            readAt: new Date(),
          },
        },
      }
    );

    const chat = await Chat.findById(chatId);
    chat.unreadCount.delete(userId.toString());
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send status update message
exports.sendStatusUpdate = async (req, res) => {
  try {
    const {
      chatId,
      senderId,
      projectId,
      oldStatus,
      newStatus,
      description,
    } = req.body;

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

    // Update chat
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        lastMessage: message._id,
        lastMessageTime: new Date(),
      },
      { new: true }
    );

    // Create project status record
    const projectStatus = new ProjectStatus({
      projectId,
      clientId: chat.clientId,
      status: newStatus,
      previousStatus: oldStatus,
      updatedBy: senderId,
      reason: description,
      chatNotificationSent: true,
    });

    await projectStatus.save();

    const populatedMessage = await message.populate("senderId", "username email profileImage");

    res.status(201).json({
      success: true,
      data: populatedMessage,
      message: "Status update sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
