const express = require("express");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Get all chats for user
router.get("/user/:userId", chatController.getUserChats);

// Get single chat
router.get("/:chatId", chatController.getChat);

// Create new chat
router.post("/", chatController.createChat);

// Assign admin to chat
router.put("/assign-admin", chatController.assignAdminToChat);

// Get unread count
router.get("/unread/:userId", chatController.getUnreadCount);

// Archive chat
router.put("/:chatId/archive", chatController.archiveChat);

// Get archived chats
router.get("/archived/:userId", chatController.getArchivedChats);

module.exports = router;
