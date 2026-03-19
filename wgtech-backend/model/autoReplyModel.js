const mongoose = require("mongoose");

const autoReplySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["greeting", "faq", "support", "custom"],
      default: "custom",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    triggerKeywords: [String], // Keywords that trigger this auto-reply
    responseDelay: {
      type: Number,
      default: 0, // in seconds
    },
    maxUsesPerDay: {
      type: Number,
      default: null, // null means unlimited
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
    attachments: [
      {
        url: String,
        type: String,
        name: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: "auto_replies",
  }
);

// Index for active replies
autoReplySchema.index({ adminId: 1, isActive: 1 });

module.exports = mongoose.model("AutoReply", autoReplySchema);
