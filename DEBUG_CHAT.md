# Chat System Debug Guide

## Quick Troubleshooting Checklist

### Step 1: Verify All Servers Are Running

Open 3 terminals and run these commands:

**Terminal 1 - Backend:**

```bash
cd E:\wgtechSol\wgtech-backend
npm run dev
```

Expected output: `🚀 Server is running on port 8003`

**Terminal 2 - Admin:**

```bash
cd E:\wgtechSol\wg-tech-admin
npm run dev
```

Expected output: `VITE v7.1.4 ready in ... Local: http://localhost:5173/`

**Terminal 3 - Client:**

```bash
cd E:\wgtechSol\wg-tech-sol
npm run dev
```

Expected output: Next.js running, accessible on http://localhost:3000

---

### Step 2: Check Socket Connection

**On Client Portal (http://localhost:3000/dashboard):**

1. Open Browser Console (F12)
2. Click the green chat button
3. Look for these logs in the console:

```
✅ Socket connected: [socket-id]
🔗 Joining chat room: [chatId] with userId: [userId]
✅ Messages fetched: [number]
📂 Opening chat, initializing...
```

**Expected sequence:**

1. `✅ Socket connected:`
2. Chat modal opens showing "👋 Hello! How can we help you today?"
3. `✅ Messages fetched: X` (should be > 0 if previous messages exist)

---

### Step 3: Send a Test Message

1. Type in the input field - **message should appear immediately**
2. Press Send button
3. Check console for:

```
📤 Sending message: {chatId, senderId, messageType, content}
✨ Message added optimistically to UI
```

---

### Step 4: Check Admin Receives Message

**On Admin Panel (http://localhost:5173):**

1. Login with: `admin@wgtech.com` / `Admin@123456`
2. Click "Chat" in left sidebar
3. Open Browser Console (F12)
4. Look for:

```
✅ Connected to socket server
```

5. Click on the chat conversation in the list
6. Should see the message appear in the chat window
7. Console should show:

```
📨 Message received on admin: {message data}
```

---

## Common Issues & Solutions

### Issue 1: ❌ Socket not connected

**Problem:** Messages don't send, console shows "Socket not connected"

**Solutions:**

1. Verify backend is running on port 8003
2. Check browser console for network errors
3. Refresh the page (Ctrl+F5)
4. Check firewall - port 8003 might be blocked

---

### Issue 2: Message doesn't show in input field

**Problem:** Typing in the message input does nothing

**Solutions:**

1. Make sure chat modal is open
2. Check if input field is focused (should have blue border)
3. Open F12 console and check for any JavaScript errors
4. Try refreshing the page

---

### Issue 3: Message sent but doesn't appear in admin

**Problem:** Client sends message, it appears on client, but not on admin

**Solutions:**

1. **Check if admin joined the chat room:**
   - Admin console should show: `🔗 Joining chat room: [chatId]`

2. **Verify socket.io is broadcasting correctly:**
   - Backend console should show: `📨 Received message` & `📤 Broadcasting message to room: chat_[chatId]`

3. **Check if admin is listening:**
   - Admin console should show: `📨 Message received on admin:`

If you see "Broadcasting" but not "received", the socket room might not be joined properly.

---

### Issue 4: Duplicate messages appearing

**Problem:** Same message appears twice in the chat

**Solution:** ⚠️ Should be fixed now with deduplication logic. If still happening:

1. Refresh the page
2. Clear browser cache
3. Check browser console for duplicate warnings

---

## Console Log Reference

### Backend Console (Port 8003)

✅ = Success
❌ = Error  
📨 = Received from client
📤 = Sending to client

```
📨 Received message - ChatID: [id] From: [userId] Content: [text]
✅ Message saved: [messageId]
✅ Chat updated: [chatId]
📤 Broadcasting message to room: chat_[chatId]
```

### Admin Console (Browser F12)

```
✅ Connected to socket server
🔗 Joining chat room: [chatId]
📨 Message received on admin: {message}
```

### Client Console (Browser F12)

```
✅ Socket connected: [socket-id]
🔗 Joining chat room: [chatId]
📤 Sending message: {payload}
📨 Message received: {message}
✨ Message added optimistically to UI
```

---

## Test Flow

1. **Client sends:** `Type "Hello" → Press Send`
   - Should see: `📤 Sending message` + message appears in chat
2. **Backend receives:** `Check backend console`
   - Should see: `📨 Received message` + `📤 Broadcasting message`
3. **Admin receives:** `Check admin console`
   - Should see: `📨 Message received on admin`
4. **Message appears:** `Should see "Hello" in admin's chat window`

---

## Nuclear Option: Full Reset

If nothing is working:

```bash
# Terminal 1: Kill all node processes
taskkill /IM node.exe /F

# Terminal 2: Clear Next.js cache
cd E:\wgtechSol\wg-tech-sol
rm -r .next

# Terminal 3: Hard refresh browser
Press Ctrl+Shift+R in Chrome/Firefox
```

Then restart all 3 servers.

---

## Still Not Working?

Please share:

1. Console output from backend (port 8003)
2. Console output from admin (F12)
3. Console output from client (F12)
4. The exact error messages you see

This will help pinpoint exactly where the flow breaks.
