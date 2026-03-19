# Chat System - Visual Architecture & Layout Guide

## Admin Panel Layout (Desktop View)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Dashboard                                              🔔 (Unread: 5)  │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌─────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │    CHAT LIST            │  │   CHAT WINDOW                         │  │
│  │  (360px width)          │  │   (Flex: 1)                          │  │
│  ├─────────────────────────┤  ├──────────────────────────────────────┤  │
│  │ 🔍 Search chats...     │  │ User Profile ▼ ☎️ 📹 📊 ⋯           │  │
│  │                        │  │                                       │  │
│  │ [Project Status: ✅ Approved]                                     │  │
│  │ ┌──────────────────────┐│  │                                       │  │
│  │ │👤 John | Website ⓵  ││  │ ┌──────────────────────────────────┐ │  │
│  │ │ Last: Hi there!      ││  │ │ 📅 March 14, 2024               │ │  │
│  │ │ 2:30 PM | 1 unread   ││  │ │                                  │ │  │
│  │ └──────────────────────┘│  │ │ [USER] 2:00 PM                  │ │  │
│  │                        │  │ │ Hello, I need help with my      │ │  │
│  │ ┌──────────────────────┐│  │ │ project.                        │ │  │
│  │ │👤 Ahmed | Admin ⓶   ││  │ │ ✓✓                              │ │  │
│  │ │ Last: Project update ││  │ │                                  │ │  │
│  │ │ 1:45 PM | 0 unread   ││  │ │ [ADMIN] 2:05 PM                │ │  │
│  │ └──────────────────────┘│  │ │ Of course! What's the issue?    │ │  │
│  │                        │  │ │ ✓✓                              │ │  │
│  │ ⚙️ Auto-Reply Settings│  │ │                                  │ │  │
│  │                        │  │ │ [USER] 2:10 PM                  │ │  │
│  │                        │  │ │ Can you update my project       │ │  │
│  │                        │  │ │ status?                         │ │  │
│  │                        │  │ │ ✓                               │ │  │
│  └─────────────────────────┘  │ └──────────────────────────────────┘ │  │
│                                │                                       │  │
│                                │ ┌──────────────────────────────────┐ │  │
│                                │ │ Type a message...          📎 ➤  │ │  │
│                                │ └──────────────────────────────────┘ │  │
│                                │                                       │  │
│  Legend:                        │                                       │  │
│  👤 = Avatar                    │                                       │  │
│  ⓵ ⓶ = Unread count            │                                       │  │
│  ✓ = Message sent              │                                       │  │
│  ✓✓ = Message read             │ [ADMIN ONLY] Update Project Status  │  │
│  🔍 = Search                   │ ├─ New Status: [Approved ▼]         │  │
│  ⚙️ = Settings                  │ ├─ Reason: Your project has been   │  │
│  ☎️ = Voice Call              │ │  reviewed and approved!           │  │
│  📹 = Video Call              │ ├─ [Cancel] [Update Status]         │  │
│  📊 = Status                   │ └─                                  │  │
│                                │                                       │  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Auto-Reply Settings Modal

```
┌──────────────────────────────────────────────────────┐
│ Auto-Reply Settings                              ✕   │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ + Add Auto-Reply                               │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ Title: Greeting                   [Toggle] ✏️   │  │
│ │ Message: Hello! Thanks for contacting us...   │  │
│ │ Category: custom                              │  │
│ │ Keywords: hello, hi, greetings                │  │
│ │ Max Uses/Day: 10          Delay: 2 sec        │  │
│ │ Status: Active            [Edit] [Delete] [✓] │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ Title: After Hours        [Toggle] ✏️  ✗ 🗑    │  │
│ │ Message: We're closed. We'll reply soon!      │  │
│ │ Category: support                             │  │
│ │ Keywords: time, hours, open                   │  │
│ │ Status: Inactive                              │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Client Portal - Chat Button View

### Closed State

```
┌──────────────────┐
│ Regular Content  │
│                  │
│                  │
│                  │
│ ┌──────────────┐ │
│ │🔴 Chat    (5)│ │ ← Floating Button with Badge
│ └──────────────┘ │
└──────────────────┘
          ▲
    Pulsing animation
```

### Open State

```
┌────────────────────────────────────────┐
│ Regular Content                        │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Chat with Support           ✕    │  │ ← Modal Header
│ ├──────────────────────────────────┤  │
│ │ 👋 Hello! How can we help...  │  │  │
│ │                               │  │  │
│ │ [AGENT] 1:00 PM               │  │  │
│ │ Hi! What can I do for you?    │  │  │
│ │ ✓✓                            │  │  │
│ │                               │  │  │
│ │ [YOU] 1:05 PM                 │  │  │
│ │ I need help with my project   │  │  │
│ │ ✓                             │  │  │
│ │                               │  │  │
│ │ ┌────────────────────────────┐│  │  │
│ │ │ Type your message... ➤     ││  │  │
│ │ └────────────────────────────┘│  │  │
│ └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

---

## Message Types Visual

### Text Message

```
┌─────────────────────────────────────┐
│                                     │
│ [OTHER]                             │
│ ┌──────────────────────────────┐   │
│ │ This is a text message       │   │
│ │                2:30 PM ✓     │   │
│ └──────────────────────────────┘   │
│                                     │
│ [SELF]                              │
│                ┌──────────────────┐ │
│                │ My response here │ │
│                │ 2:35 PM ✓✓       │ │
│                └──────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Status Update Message

```
┌──────────────────────────────────────┐
│                                      │
│       🟢 Project Status Update        │
│     ┌────────────────────────────┐  │
│     │ Under Review → Approved    │  │
│     │ Your project has been      │  │
│     │ reviewed and approved!     │  │
│     │ 😊 Congratulations!        │  │
│     │ 2:50 PM                    │  │
│     └────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

### File/Document Message

```
┌─────────────────────────────────────┐
│                                     │
│ [OTHER]                             │
│ ┌────────────────────────────────┐ │
│ │ 📄 project-requirements.pdf    │ │
│ │ 2.5 MB | 2:40 PM              │ │
│ │ [Download]                     │ │
│ └────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## Responsive Layout - Mobile View

```
Mobile (< 480px)
┌────────────────────────────┐
│ Chat with Support      ✕   │ ← Modal Full Screen
├────────────────────────────┤
│ 👋 Hello! How can...       │
│                            │
│ [AGENT] 1:00 PM            │
│ Hi! What can I do...       │
│ ✓✓                         │
│                            │
│ [YOU] 1:05 PM              │
│ I need help with my...     │
│ ✓                          │
│                            │
│ [Chat Button ┃]    ┌─────┐│
│ moved off    ┃ ──→ │🔴   ││
│ screen      ┃     │Chat ││
│             ┃     │  (5)││
│             ┃     └─────┘│
│                            │
│ ┌──────────────────────┐  │
│ │ Type message... ➤    │  │
│ └──────────────────────┘  │
└────────────────────────────┘
```

---

## Tablet View (480px < width < 768px)

```
┌───────────────────────────────────────┐
│                                       │
│ ┌──────────────┐ ┌─────────────────┐ │
│ │ Chat List    │ │ Chat Window     │ │
│ │ (40%)        │ │ (60%)           │ │
│ ├──────────────┤ ├─────────────────┤ │
│ │ 🔍 Search   │ │ User | ☎️ 📹 📊 │ │
│ │              │ │                 │ │
│ │ ┌──────────┐ │ │ Messages here   │ │
│ │ │🔴 Chat ⓵│ │ │                 │ │
│ │ └──────────┘ │ │                 │ │
│ │              │ │ Type message... │ │
│ │ ┌──────────┐ │ └─────────────────┘ │
│ │ │👤 Ahmed ⓶│ │                     │
│ │ └──────────┘ │                     │
│ │              │                     │
│ └──────────────┘                     │
│                                       │
└───────────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors

```
Logo/Primary: #00a884 (WhatsApp Green)
Background:  #fff    (White)
Text Dark:   #000    (Black)
Text Light:  #54656f (Gray)
```

### Message Colors

```
User Message:       #dcf8c6 (Light Green)
Other Message:      #e5e5ea (Light Gray)
Status Good:        #10b981 (Green)
Status Pending:     #f59e0b (Amber)
Status Error:       #ef4444 (Red)
Status Info:        #3b82f6 (Blue)
```

### UI Elements

```
Online Indicator:   #31a24c (Dark Green)
Unread Badge:       #ef4444 (Red)
Hover:              #f5f5f5 (Light Gray)
Border:             #e5e5e5 (Gray)
Avatar Gradient:    #667eea → #764ba2 (Purple)
```

---

## Chat Flow Diagram

```
User logs in
    ↓
Chat button appears (Client Portal)
    ↓
┌─────────────────────────────────────┐
│ User clicks "Chat"                  │
│           ↓                         │
│   Check if chat exists              │
│           ↓                         │
│  No ────→ Create chat ──→ Load chat │
│           ↑                         │
│         Yes ─────────────────────→  │
│                                     │
│ User types message                  │
│           ↓                         │
│  Emit "send_message" via socket     │
│           ↓                         │
│  Backend saves to DB                │
│           ↓                         │
│  Broadcast to recipients            │
│           ↓                         │
│  Display in chat window (real-time) │
│                                     │
│ Admin sees notification             │
│           ↓                         │
│  Admin replies (manual or auto)     │
│           ↓                         │
│  Message appears in both clients    │
│                                     │
└─────────────────────────────────────┘
    ↓
Status Update Flow
    ↓
┌─────────────────────────────────────┐
│ Admin updates project status        │
│           ↓                         │
│ Emit "send_status_update"           │
│           ↓                         │
│ Save to DB + create message         │
│           ↓                         │
│ Broadcast status change             │
│           ↓                         │
│ Client receives notification        │
│           ↓                         │
│ Status appears in chat              │
│           ↓                         │
│ Status shows in project portal      │
└─────────────────────────────────────┘
```

---

## Component Hierarchy

```
ChatContainer (Main Container)
├── ChatSidebar (Chat List)
│   ├── Search Filter
│   ├── Chat List Items
│   │   ├── User Avatar
│   │   ├── Chat Info
│   │   └── Unread Badge
│   └── Auto-Reply Settings Button
│
├── ChatWindow (Main Chat Area)
│   ├── Window Header
│   │   ├── User Profile
│   │   ├── Voice Call Button
│   │   ├── Video Call Button
│   │   └── Options Menu
│   │
│   ├── ProjectStatusIndicator
│   │   └── Status Badge
│   │
│   ├── MessageList (Messages Display)
│   │   ├── Date Dividers
│   │   └── Messages
│   │       ├── Text Messages
│   │       ├── Status Updates
│   │       ├── File Messages
│   │       └── Read Receipts
│   │
│   └── MessageInput (Input Area)
│       ├── File Upload Button
│       ├── Message Input
│       └── Send Button
│
├── AutoReplySettings (Modal)
│   ├── Auto-Reply List
│   └── Add/Edit Form
│
└── NotificationBadge
    └── Unread Count Display
```

---

## State Management Flow

```
ChatContainer State:
├── chats: Chat[] - All user chats
├── selectedChat: Chat | null - Currently selected
├── messages: Message[] - Chat messages
├── unreadCount: object - Unread per chat
├── totalUnread: number - Total unread
├── onlineUsers: object - User statuses
├── loading: boolean - Loading state
└── showAutoReply: boolean - Modal visible

Socket Events Flow:
├── Connect ──→ Join rooms ──→ Listen events
├── user_online/offline ──→ Update onlineUsers
├── message_received ──→ Add to messages + update unread
├── message_read ──→ Update read receipts
├── typing ──→ Show typing indicator
├── status_update ──→ Add to messages + notify
└── Disconnect ──→ Cleanup
```

---

## Performance Metrics

```
Initial Load:
├── Component Mount: ~500ms
├── Socket Connection: ~100ms
├── Fetch Chats: ~300ms
├── Fetch Messages: ~400ms
└── Total: ~1.3s

Message Send:
├── Emit Event: ~50ms
├── Backend Process: ~200ms
├── Socket Broadcast: ~50ms
├── Render Update: ~100ms
└── Total: ~400ms (user perceives ~100ms)

WebSocket Latency:
├── Message Send: ~50-150ms
├── Typing Indicator: ~20-50ms
├── Read Receipt: ~20-50ms
└── Status Update: ~50-100ms
```

---

This visual guide helps understand the layout, flow, and architecture of the chat system!
