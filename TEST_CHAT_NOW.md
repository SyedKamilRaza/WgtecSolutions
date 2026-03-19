# Quick Test Instructions

## Before Testing - Start All Servers

**Open 3 PowerShell terminals and run EACH separately:**

```powershell
# Terminal 1
cd E:\wgtechSol\wgtech-backend
npm run dev
```

Wait for: `🚀 Server is running on port 8003`

```powershell
# Terminal 2
cd E:\wgtechSol\wg-tech-admin
npm run dev
```

Wait for: `VITE v7.1.4 ready...`

```powershell
# Terminal 3
cd E:\wgtechSol\wg-tech-sol
npm run dev
```

Wait for Next.js to start.

---

## Test #1: Input Text Visibility

**On http://localhost:3000/dashboard:**

1. Open Developer Console (F12 key)
2. Click the **green chat button** (bottom-right)
3. Wait for chat window to appear
4. Look at the console for these exact lines:
   ```
   ✅ Socket connected: ...
   🔗 Joining chat room: ...
   ✅ Messages fetched: ...
   ```
5. **COPY the exact console output and paste it below:**

(If you see "Loading chat..." message for more than 2 seconds, something is wrong)

6. **Try typing in the input field** - Does text appear?
   - Click in the input box
   - Type "Hello"
   - **SCREENSHOT this** OR tell me if text appears

---

## Test #2: Send Message & Check Admin

**On the same client (http://localhost:3000):**

1. If text appeared in input, press "Send" button
2. Check console for this line:
   ```
   📤 Sending message: {... content ...}
   ```
3. Should see message appear in chat immediately

**Copy entire Console output here:**

---

## Test #3: Admin Receives Message

**On http://localhost:5173 (Admin Panel):**

1. Login: `admin@wgtech.com` / **`Admin@123456`**
2. Click "Chat" in left sidebar
3. Open Developer Console (F12)
4. Click on the chat conversation in the list
5. Youshould see these lines in console:
   ```
   ✅ Connected to socket server
   🔗 Joining chat room: ...
   ```
6. The message you sent fromt the client should appear here
7. **Copy the entire console output:**

---

## What I Need From You

Please reply with:

1. **CLIENT CONSOLE OUTPUT** (from Test #1 & #2)
   - Copy everything from the "Console" tab in F12
   - Include any errors or warnings

2. **ADMIN CONSOLE OUTPUT** (from Test #3)
   - Copy everything from the "Console" tab in F12

3. **BACKEND CONSOLE OUTPUT**
   - Copy the output from Terminal 1 (wgtech-backend)

4. **Multiple Choice:**
   - [ ] Text DOES appear in input field when I type
   - [ ] Text DOES NOT appear in input field
   - [ ] Text appears briefly then disappears
   - [ ] Message appears on client DOES appear on admin
   - [ ] Message appears on client but DOES NOT reach admin
   - [ ] Nothing happens at all

5. **Screenshot the issue** if possible

This will help me pinpoint exactly where the problem is!
