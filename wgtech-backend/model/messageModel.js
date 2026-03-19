const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "file", "image", "document", "call", "status_update"],
      default: "text",
    },
    content: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      default: null,
    },
    fileName: {
      type: String,
      default: null,
    },
    fileSize: {
      type: Number,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    documentUrl: {
      type: String,
      default: null,
    },
    documentName: {
      type: String,
      default: null,
    },
    callDuration: {
      type: Number,
      default: null, // in seconds
    },
    callType: {
      type: String,
      enum: ["voice", "video", null],
      default: null,
    },
    callStatus: {
      type: String,
      enum: ["initiated", "accepted", "rejected", "ended", "missed", null],
      default: null,
    },
    statusUpdate: {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
      oldStatus: String,
      newStatus: {
        type: String,
        enum: ["Rejected", "Approved", "Completed", "Under Review"],
      },
      description: String,
    },
    editedAt: {
      type: Date,
      default: null,
    },
    editHistory: [
      {
        content: String,
        editedAt: Date,
      },
    ],
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: Date,
      },
    ],
    reactions: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "messages",
  }
);

// Index for faster queries
messageSchema.index({ chatId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
