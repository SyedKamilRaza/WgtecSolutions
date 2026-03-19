const express = require("express");
const autoReplyController = require("../controllers/autoReplyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Create auto-reply
router.post("/", autoReplyController.createAutoReply);

// Get all auto-replies for admin
router.get("/admin/:adminId", autoReplyController.getAutoReplies);

// Get single auto-reply
router.get("/:autoReplyId", autoReplyController.getAutoReply);

// Get by keyword
router.get("/keyword", autoReplyController.getAutoReplyByKeyword);

// Update auto-reply
router.put("/:autoReplyId", autoReplyController.updateAutoReply);

// Delete auto-reply
router.delete("/:autoReplyId", autoReplyController.deleteAutoReply);

// Toggle active status
router.patch("/:autoReplyId/toggle", autoReplyController.toggleAutoReply);

module.exports = router;
