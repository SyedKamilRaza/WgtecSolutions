const express = require("express");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Send message
router.post("/", messageController.sendMessage);

// Get messages for chat
router.get("/chat/:chatId", messageController.getMessages);

// Edit message
router.put("/:messageId", messageController.editMessage);

// Delete message
router.delete("/:messageId", messageController.deleteMessage);

// Add reaction
router.post("/:messageId/reaction", messageController.addReaction);

// Remove reaction
router.delete("/:messageId/reaction", messageController.removeReaction);

// Mark as read
router.post("/read", messageController.markAsRead);

// Send status update
router.post("/status-update", messageController.sendStatusUpdate);

module.exports = router;
