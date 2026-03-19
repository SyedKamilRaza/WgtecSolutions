const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./config.prod.env" });
} else {
  dotenv.config({ path: "./config.dev.env" });
}

const User = require("./model/userModel");
const Chat = require("./model/chatModel");
const Message = require("./model/messageModel");
const UserRole = require("./model/userRole");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL, {
      retryWrites: true,
      w: "majority",
    });

    console.log("✅ MongoDB connected");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    await UserRole.deleteMany({});

    // Create admin role
    console.log("👔 Creating admin role...");
    const adminRole = await UserRole.create({
      roleName: "admin",
      totalRoutes: 2,
      routes: [
        {
          order: 1,
          title: "Dashboard",
          path: "/",
          permissions: [
            { isCandlestickChart: true },
            { isTop5Projects: true },
            { isViewAllProjects: true },
          ],
        },
        {
          order: 1.5,
          title: "Chat",
          path: "/chat",
          permissions: [
            { isDelete: true },
            { isView: true },
            { isCreate: true },
            { isEdit: true },
          ],
        },
      ],
      status: true,
    });

    console.log("✅ Admin role created:", adminRole._id);

    // Create client role
    console.log("👔 Creating client role...");
    const clientRole = await UserRole.create({
      roleName: "client",
      totalRoutes: 0,
      routes: [],
      status: true,
    });

    console.log("✅ Client role created:", clientRole._id);

    // Clear existing data
    console.log("🗑️  Clearing existing users data...");
    await User.deleteMany({});

    // Create admin user
    console.log("👤 Creating admin user...");
    const admin = await User.create({
      username: "admin",
      email: "admin@wgtech.com",
      password: "Admin@123456",
      fullname: "Admin User",
      designation: adminRole._id,
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: true,
    });

    console.log("✅ Admin created:", admin.email);

    // Create test client
    console.log("👤 Creating test client...");
    const client = await User.create({
      username: "testclient",
      email: "client@example.com",
      password: "Client@123456",
      fullname: "Test Client",
      designation: clientRole._id,
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: true,
    });

    console.log("✅ Client created:", client.email);

    // Create chat
    console.log("💬 Creating test chat...");
    const chat = await Chat.create({
      participants: [admin._id, client._id],
      chatType: "website",
      clientId: client._id,
      assignedAdmin: admin._id,
      unreadCount: new Map(),
    });

    console.log("✅ Chat created:", chat._id);

    // Create test messages
    console.log("📨 Creating test messages...");
    const messages = await Message.insertMany([
      {
        chatId: chat._id,
        senderId: client._id,
        messageType: "text",
        content: "Hello! I have a question about your services.",
        readBy: [
          { userId: client._id, readAt: new Date() },
          { userId: admin._id, readAt: new Date() },
        ],
      },
      {
        chatId: chat._id,
        senderId: admin._id,
        messageType: "text",
        content:
          "Hi! Sure, I'd be happy to help. What would you like to know?",
        readBy: [{ userId: admin._id, readAt: new Date() }],
      },
      {
        chatId: chat._id,
        senderId: client._id,
        messageType: "text",
        content: "Can you tell me about your software development services?",
        readBy: [
          { userId: client._id, readAt: new Date() },
          { userId: admin._id, readAt: new Date() },
        ],
      },
      {
        chatId: chat._id,
        senderId: admin._id,
        messageType: "text",
        content:
          "Absolutely! We offer custom software development, web applications, mobile apps, and more.",
        readBy: [{ userId: admin._id, readAt: new Date() }],
      },
    ]);

    console.log("✅ Messages created:", messages.length);

    // Update chat with last message
    await Chat.findByIdAndUpdate(chat._id, {
      lastMessage: messages[messages.length - 1]._id,
      lastMessageTime: new Date(),
    });

    console.log("✅ Chat updated with last message");

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📋 Test Credentials:");
    console.log("   Admin:");
    console.log("   - Email: admin@wgtech.com");
    console.log("   - Password: Admin@123456");
    console.log("\n   Client:");
    console.log("   - Email: client@example.com");
    console.log("   - Password: Client@123456");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
