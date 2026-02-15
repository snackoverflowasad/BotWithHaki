# BotWithHaki

> A personality-driven WhatsApp AI agent that replies, assits, set reminders and schedule meetings when I’m busy built with OpenAI Agents SDK, guardrails, tools, and memory architecture.

---

## Overview

**Luffy** is a conversational AI assistant that automatically responds to WhatsApp messages when I’m unavailable.

It is:

- Agent-based (OpenAI Agents SDK)
- Context-aware (short-term memory per user)
- Guardrail protected (safe output validation)
- Tool-enabled (structured function calling)
- Personality-driven (Luffy-inspired energy)
- Event-driven architecture

This project demonstrates how to build a real-world conversational agent with proper architecture and flow control.

---
## Logging into WhatsApp (Terminal Setup)

This project uses `whatsapp-web.js`, which connects to WhatsApp Web using QR authentication.

### First-Time Setup

1. Install dependencies:

```bash
npm install
```
2. Start the bot:
```bash
npm run dev
```
3. A QR code will appear in your terminal.
4. Open WhatsApp on your phone:
    - Go to Settings
    - Tap Linked Devices
    - Tap Link a Device
    - Scan the QR code shown in the terminal

5. nce scanned successfully, the terminal will show:
```bash
WhatsApp Bot is READY and connected!
```
- You are now logged in.

### Session Persistence

The login session is stored locally using LocalAuth.
This means:
- You only need to scan the QR code once.
- Future restarts will reuse the saved session.

- If you delete the .wwebjs_auth folder, you will need to scan again.

### Re-Login
If you need to log in again:
1. Stop the bot
2. Delete the .wwebjs_auth folder
3. Run:

```bash
npm run dev
```
4. Scan the new QR code
> ⚠️ Important Notes : Keep your terminal open while the bot is running. Do not manually close the WhatsApp Web browser window if it opens.Ensure your internet connection is stable.
---

## Features

### AI Agent
- Powered by OpenAI Agents SDK
- Character-based identity
- Structured system instructions
- Tool invocation support

### Memory Layer
- Per-user short-term memory
- Configurable history length
- Context injection into agent

### Guardrails
- Output validation layer
- Tripwire-based safety checks
- Soft moderation fallback

### Tools
- Custom tool integration via Agents SDK
- Structured parameter validation using Zod
- Dynamic tool routing

### Command System
- `/`
- `/history`
- `/schedule`
- `/time`
- `/reset`
- Extendable command service

### Availability Simulation
- Responds on behalf of Asad
- Schedule meetings for Asad
- Set reminders for Asad
- Handles time-based logic
- Avoids revealing personal activity

---

## Architecture
```yml
WhatsApp Event
↓
Message Handler
↓
Memory Store
↓
Agent Execution
↓
Guardrails
↓
Reply
```

Layer separation:

- `messageHandler` → flow controller
- `memoryService` → short-term context store
- `agentService` → OpenAI agent logic
- `guardrailService` → safety layer
- `commandService` → structured commands
- `toolDefinitions` → agent tools

---

## Tech Stack

- Node.js
- TypeScript
- whatsapp-web.js
- OpenAI Agents SDK
- Zod (schema validation)
- Event-driven async architecture

---

## Project Structure
```md
├── 📁 public
│   └── ⚙️ .gitkeep # to keep easy get data
├── 📁 src
│   ├── 📁 agents
│   │   ├── ⚙️ .gitkeep
│   │   └── 📄 agent.servce.ts # main agent service
│   ├── 📁 config
│   │   ├── ⚙️ .gitkeep
│   │   └── 📄 agent.protocol.ts # agent protocols/rules
│   ├── 📁 guardrails
│   │   └── 📄 agent.guardrails.ts # guardrails
│   ├── 📁 services
│   │   ├── 📄 command.service.ts # command service
│   │   ├── 📄 memory.service.ts # memory service
│   │   └── 📄 messageHandler.service.ts # message handler service
│   ├── 📁 tools
│   │   ├── 📄 contact.tool.ts # contact tool
│   │   ├── 📄 getHistory.ts # get history tool
│   │   └── 📄 time.tool.ts # time tool
│   ├── 📁 types
│   │   └── 📄 types.ts # types
│   ├── 📁 utils
│   │   └── ⚙️ .gitkeep
│   ├── 📄 bot.ts # whatsapp bot config
│   └── 📄 index.ts # entry point
├── ⚙️ .gitignore # ignore files
├── 📝 README.md 
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── ⚙️ tsconfig.json
```

---

##  Setup

### 1. Install dependencies

```bash
npm install
```
### 2. Add environment variables
- Create a .env file:
```.env
OPENAI_API_KEY=your_openai_key
```
### 3. Run the bot
- Compile the ts file
```bash
npm run start 
```
- Run the agent
```bash
npm run dev
```
--- 
## Safety Design

The agent includes:
- Output validation guardrails
- Offensive language prevention
- Tool misuse control
- Tripwire-based abort system
- Safe fallback responses
- The system ensures no unsafe or rude output is delivered.
---
## Personality Design

The agent:
- Identifies as an AI assistant built by Asad
- Does not mention WhatsApp explicitly
- Uses energetic, friendly tone
- Matches user language (English / Hinglish / Bengali in English script)
- Politely declines coding requests
- Avoids general knowledge queries requiring external search
---
## Chat History & Storage

This project stores chat history using an in-memory structure on the local machine.

- A maximum of **15 recent messages per user** are stored.
- Older messages are automatically removed once the limit is exceeded.
- Chat history is stored **only in local RAM**.
- No data is written to disk.
- No database is used.
- No external storage is involved.

Users can manage their data using built-in commands:

- `/history` → View the currently stored conversation history.
- `/reset` → Clear all stored chat history for that user.

All conversation data exists only while the bot is running.  
If the server restarts, the memory is cleared automatically.

This ensures lightweight performance, temporary storage, and user-controlled data management.

---
## License
 ##### [MIT LICENCE](\LICENSE)

---

## Contact

I am open to discussing opportunities and collaborations. Connect with me:

- **Email:** [techie.asad.dev@gmail.com](mailto:techie.asad.dev@gmail.com)  
- **GitHub:** [@asad-bot07](https://github.com/Asad-bot07)  
- **LinkedIn:** [Asad Hussain](https://www.linkedin.com/in/asad-hussain-765502319/)  

---

## Portfolio Link

Explore my work and professional journey: [asadhussain.in](https://www.asadhussain.in/)