const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const AutoReply = require("../model/autoReplyModel");
const User = require("../model/userModel");
const ProjectStatus = require("../model/projectStatusModel");

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { chatType } = req.query;

    let query = {
      participants: userId,
      isActive: true,
    };

    if (chatType) {
      query.chatType = chatType;
    }

    const chats = await Chat.find(query)
      .populate("clientId", "username email profileImage")
      .populate("assignedAdmin", "username email profileImage")
      .populate("lastMessage")
      .populate("projectId", "title status")
      .sort({ lastMessageTime: -1 })
      .exec();

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single chat
exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.userId;

    const chat = await Chat.findById(chatId)
      .populate("clientId", "username email profileImage")
      .populate("assignedAdmin", "username email profileImage")
      .populate("participants", "username email profileImage")
      .populate("projectId", "title status")
      .exec();

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Mark messages as read
    await Message.updateMany(
      {
        chatId: chatId,
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

    // Update unread count
    if (chat.unreadCount.has(userId.toString())) {
      chat.unreadCount.delete(userId.toString());
      await chat.save();
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new chat
exports.createChat = async (req, res) => {
  try {
    const { clientId, chatType, assignedAdmin, projectId } = req.body;

    // Check if chat already exists
    let chat = await Chat.findOne({
      clientId,
      chatType,
      projectId: projectId || null,
    });

    if (chat) {
      return res.status(200).json({
        success: true,
        data: chat,
        message: "Chat already exists",
      });
    }

    const participants = [clientId];
    
    // Auto-assign an admin if none provided for website chats.
    // The old logic looked for `isAdmin` flag which doesn't exist in the schema, so fallback to first active user.
    let admin = assignedAdmin;
    if (!admin && chatType === "website") {
      const User = require("../model/userModel");
      const firstAdmin = await User.findOne({ isActive: true }).select("_id");
      if (firstAdmin) {
        admin = firstAdmin._id;
        participants.push(admin);
      }
    } else if (assignedAdmin) {
      participants.push(assignedAdmin);
    }

    chat = new Chat({
      participants,
      chatType,
      clientId,
      assignedAdmin: admin || null,
      projectId: projectId || null,
      unreadCount: new Map(),
    });

    await chat.save();

    await chat.populate("clientId", "username email profileImage");
    await chat.populate("assignedAdmin", "username email profileImage");

    res.status(201).json({
      success: true,
      data: chat,
      message: "Chat created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign admin to chat
exports.assignAdminToChat = async (req, res) => {
  try {
    const { chatId, adminId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        assignedAdmin: adminId,
        $addToSet: { participants: adminId },
      },
      { new: true }
    )
      .populate("clientId", "username email profileImage")
      .populate("assignedAdmin", "username email profileImage")
      .exec();

    res.status(200).json({
      success: true,
      data: chat,
      message: "Admin assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get unread count for user
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await Chat.find({
      participants: userId,
      isActive: true,
    });

    let totalUnread = 0;
    const unreadByChat = {};

    chats.forEach((chat) => {
      const count = chat.unreadCount.get(userId.toString()) || 0;
      unreadByChat[chat._id] = count;
      totalUnread += count;
    });

    res.status(200).json({
      success: true,
      data: {
        totalUnread,
        unreadByChat,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Archive chat
exports.archiveChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.userId;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $addToSet: { archivedBy: userId },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: chat,
      message: "Chat archived successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get archived chats
exports.getArchivedChats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await Chat.find({
      archivedBy: userId,
    })
      .populate("clientId", "username email profileImage")
      .populate("assignedAdmin", "username email profileImage")
      .populate("lastMessage")
      .sort({ lastMessageTime: -1 })
      .exec();

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
