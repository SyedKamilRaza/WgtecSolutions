const mongoose = require("mongoose");

const projectStatusSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Rejected", "Approved", "Completed", "Under Review"],
      required: true,
    },
    previousStatus: {
      type: String,
      enum: ["Rejected", "Approved", "Completed", "Under Review"],
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    notificationSentAt: {
      type: Date,
      default: null,
    },
    chatNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "project_statuses",
  }
);

// Index for faster queries
projectStatusSchema.index({ projectId: 1 });
projectStatusSchema.index({ clientId: 1, createdAt: -1 });

module.exports = mongoose.model("ProjectStatus", projectStatusSchema);
