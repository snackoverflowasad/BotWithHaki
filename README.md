![Chat Buddy Preview](public/preview.png)

<div align="center">

# Chat Buddy

[![npm version](https://img.shields.io/npm/v/chat-buddy?style=for-the-badge&color=CB3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/chat-buddy)
[![npm downloads](https://img.shields.io/npm/dm/chat-buddy?style=for-the-badge&color=0576b9&logo=npm&logoColor=white)](https://www.npmjs.com/package/chat-buddy)
[![license](https://img.shields.io/github/license/shouri123/BotWithHaki?style=for-the-badge&color=green)](https://github.com/shouri123/BotWithHaki)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

**A Highly Personalized, Personality-Driven WhatsApp AI Assistant**

Built with the OpenAI Agents SDK · Custom Tools · Per-User Memory · Guardrails

---

[Installation](#installation) · [Quick Start](#quick-start) · [Commands](#commands) · [Docker](#running-with-docker) · [Message Debounce and Token Optimization](#message-debounce-and-token-optimization) · [Architecture](#architecture) · [Chat Commands](#in-chat-commands) · [Security](#security--privacy) · [Contributing](#contributing)

</div>

---

## What is Chat Buddy?

**Chat Buddy** is an AI-powered WhatsApp assistant that runs entirely from your terminal. It acts as your personal proxy — answering messages, scheduling calendar events, and managing chats with a personality you define.

### Highlights

| Feature | Description |
|---------|-------------|
| **Agentic Core** | Powered by the OpenAI Agents SDK with dynamic tool-calling |
| **Short-Term Memory** | Per-user conversation context for natural, flowing replies |
| **AES-256 Encryption** | API keys encrypted locally — never stored in plain text |
| **Guardrails** | Output validation layer blocks unsafe or off-brand responses |
| **Google Calendar** | Schedule meetings & reminders directly from WhatsApp |
| **Debounced Replies** | Merges rapid user bursts into one AI call to reduce token usage |
| **Zero Config Deploy** | Install globally, run the wizard, scan QR — done |

---

## Installation
![Demo](./public/tutorial.gif)

```bash
# Install globally
npm i -g chat-buddy

# Or run without global install
npx chat-buddy init
```

Use `chat-buddy <command>` after global install. Use `npx chat-buddy <command>` only if not installed globally.

> **Requirements:** Node.js ≥ 18.0.0

---

## Quick Start

```bash
# Step 1 — Run the interactive setup wizard
chat-buddy init

# Step 2 — Start the bot
chat-buddy run

# Step 3 — Scan the QR code in WhatsApp → Linked Devices → Link a Device
```

That's it. Your AI assistant is now live on WhatsApp.

---

## Setting Up Google Calendar API

To enable calendar features (scheduling meetings, reminders), you need to create Google OAuth 2.0 credentials.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown (top-left) and select **New Project**
3. Name it (e.g., `Chat Buddy` or `WhatsApp Bot`)
4. Click **Create** and wait for the project to initialize

### Step 2: Enable Google Calendar API

1. In the Cloud Console, go to **APIs & Services** → **Library**
2. Search for "**Google Calendar API**"
3. Click on it and select **Enable**
4. Wait for the API to be enabled (you'll see a blue "Manage" button)

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** (top button)
3. Select **OAuth 2.0 Client IDs**
4. For **Application Type**, choose **Desktop application**
5. Click **Create**
6. A dialog appears with your **Client ID** and **Client Secret** — copy these values

### Step 4: Download Credentials (Optional)

1. In the Credentials page, find your newly created OAuth app
2. Click the download icon (⬇) to get `credentials.json`
3. This file is optional — Chat Buddy will prompt you for Client ID/Secret during setup

### Step 5: Set Up Chat Buddy

When you run `chat-buddy init`, you'll be asked for a **Google API Key**. You have two options:

| Option | Process |
|--------|---------|
| **Option A: Use OAuth (Recommended)** | Leave the field blank during `init`. Later, run `chat-buddy login` to generate an OAuth token. Chat Buddy will prompt for your Client ID and Secret. |
| **Option B: Manual Setup** | Place your downloaded `credentials.json` in your working directory or set `GOOGLE_OAUTH_CREDENTIALS_PATH=/path/to/credentials.json` as an environment variable. |

### Step 6: Generate OAuth Token

```bash
chat-buddy login
```

This opens your browser to Google's consent screen. Approve access and the token is saved to `~/.botwithaki/google/token.json` automatically.

### Verify Everything Works

Once set up, test with an in-chat command:

```
/schedule lunch meeting tomorrow at 2pm
```

If the calendar syncs successfully, your event appears in Google Calendar.

---

## Commands

Chat Buddy provides a full CLI to manage your bot lifecycle:

### `chat-buddy init`

```bash
chat-buddy init
```

Launches the **interactive setup wizard**. You'll be prompted to enter:

| Prompt | Description |
|--------|-------------|
| **Username** | Your name — the agent uses this to know who it represents |
| **Agent Name** | The bot's display name (e.g. "Luffy", "Jarvis") |
| **OpenAI API Key** | Your `sk-...` key that powers the AI agent |
| **Google API Key** | Your `AIza...` key for Google Calendar integration |

All secrets are **encrypted with AES-256-CBC** and stored at `~/.botwithaki/config.json`. They are never sent anywhere except to the respective API services.

> Running `init` again will **overwrite** your existing configuration.

---

### `chat-buddy run`

```bash
chat-buddy run
```

Starts the WhatsApp bot. This command:

1. Loads and decrypts your saved configuration
2. Falls back to `.env` file if no config is found
3. Validates that required API keys exist
4. Initializes the `whatsapp-web.js` client
5. Displays a **QR code** in the terminal for WhatsApp linking

**First-time setup:**

```
Scan QR to login:
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ ▀▄ ...
█ █   █ █▀▀▄ ...
...
```

Open WhatsApp → **Settings** → **Linked Devices** → **Link a Device** → Scan the code.

**Subsequent runs:** Your session is persisted automatically. No QR scan needed unless you run `chat-buddy new --config` to reset auth.

By default, user messages are debounced per user. If someone sends multiple quick messages, Chat Buddy waits briefly and replies once with a combined response.

---

### `chat-buddy login` (alias: `chat-buddy log`)

```bash
chat-buddy login
```

Generates a **Google Calendar OAuth token** by opening the Google consent screen in your browser.

| Detail | Value |
|--------|-------|
| **Scope** | `https://www.googleapis.com/auth/calendar` |
| **Requires** | OAuth credentials (auto-discovered or prompted) |
| **Output** | `~/.botwithaki/google/token.json` |

This is required for the bot's calendar features (scheduling meetings, setting reminders).

> **Credentials note:**
> You do not need to manually place `credentials.json` in your working directory anymore.
> `chat-buddy login` will auto-discover credentials from supported locations or prompt once for OAuth Client ID and Client Secret.
>
> **If you still prefer manual `credentials.json` setup:**
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a project → Enable the **Google Calendar API**
> 3. Create **OAuth 2.0 credentials** (Desktop App type)
> 4. Download the JSON and rename it to `credentials.json`
> 5. Place it in your current directory or set `GOOGLE_OAUTH_CREDENTIALS_PATH`

---

### `chat-buddy key`

```bash
chat-buddy key
```

**Rotate your API keys** without re-running the full setup wizard. Useful when:
- Your OpenAI key has been compromised or expired
- You want to switch to a different Google project
- You're migrating to a new API key

**How it works:**
1. Loads your existing encrypted config
2. Prompts for new keys — **leave blank to keep the current value**
3. Re-encrypts and saves the updated config instantly

```
   API Key Rotation
  ─────────────────────────────────────────

  Leave a field blank to keep the current key.

   New OpenAI API key (sk-...): sk-proj-new-key-here
   New Google API key (AIza...):            ← left blank, keeps existing

   API keys updated securely!
```

---

### `chat-buddy new --config`

```bash
chat-buddy new --config
```

The **all-in-one reconfiguration** command. Use this when you want to give your bot a fresh start:

| Step | Action |
|------|--------|
| **Rename Agent** | Change the bot's agent name (e.g. "Luffy" → "Jarvis") |
| **Rotate Keys** | Enter new OpenAI and/or Google API keys |
| **Reset WhatsApp** | Deletes the saved WhatsApp session (`~/.botwithaki/.wwebjs_auth`) |
| **Reset Google** | Deletes the Google OAuth token (`~/.botwithaki/google/token.json`) |

After running this, the next `chat-buddy run` will require a fresh QR scan and (optionally) re-running `chat-buddy login` for calendar access.

```
   Chat-Buddy — Full Reconfiguration
  ─────────────────────────────────────────

   New Agent Identity
     Current agent name: Luffy
   New agent name (leave blank to keep): Jarvis

   API Key Rotation
     Leave blank to keep the current key.
   New OpenAI API key (sk-...):
   New Google API key (AIza...):

  Clearing auth sessions...
     WhatsApp session cleared
     Google token removed

   Reconfiguration complete!

   Agent name: Jarvis
   API keys updated securely
   Auth sessions cleared — re-scan QR on next run
```

---

## Message Debounce and Token Optimization

To reduce unnecessary token usage, Chat Buddy buffers rapid consecutive messages from the same user and sends one combined request to the agent.

### How it works

1. User sends multiple quick messages.
2. Bot waits for a short pause window.
3. Messages are merged into one batched prompt.
4. Bot sends one AI reply instead of multiple separate replies.

Example:

- Incoming: `hey`
- Incoming: `how are you`
- Outgoing: one combined reply after pause

### Configure debounce delay

Set environment variable `CHAT_BUDDY_RESPONSE_DEBOUNCE_MS`.

- Default: `2200`
- Minimum: `300`
- Maximum: `15000`

Example:

```bash
CHAT_BUDDY_RESPONSE_DEBOUNCE_MS=1800 chat-buddy run
```

Note: command messages such as `/time`, `/history`, `/reset`, and `/schedule` are handled immediately and are not debounced.

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                  WhatsApp Client                 │
│              (whatsapp-web.js + QR)              │
└───────────────────────┬──────────────────────────┘
                        │ incoming message
                        ▼
┌──────────────────────────────────────────────────┐
│              Message Handler Service             │
│       (routing, command parsing, flow ctrl)      │
└───────────────────────┬──────────────────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
┌──────────────────┐   ┌──────────────────────────┐
│  Memory Service  │   │   OpenAI Agent Runner    │
│ (per-user context│   │  (Agents SDK + tools)    │
│  last 15 msgs)   │   │                          │
└──────────────────┘   └────────────┬─────────────┘
                                    │
                        ┌───────────┴───────────┐
                        ▼                       ▼
              ┌──────────────────┐   ┌─────────────────┐
              │   Tool Layer     │   │  Guardrails     │
              │ • /time          │   │ • Output filter │
              │ • /schedule      │   │ • Safety check  │
              │ • /history       │   │ • Persona lock  │
              │ • Google Calendar│   │                 │
              └──────────────────┘   └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │  WhatsApp Reply │
                                    └─────────────────┘
```

---

## In-Chat Commands

These commands can be sent directly in any WhatsApp chat to control the bot:

| Command | Description |
|---------|-------------|
| `/history` | Display the recent conversation context (useful for debugging) |
| `/reset` | Clear the bot's short-term memory for your user |
| `/schedule` | Schedule a Google Calendar event via natural language |
| `/time` | Get the current time from the bot |

---

## Project Structure

```
BotWithHaki/
├── src/
│   ├── cli/                 # CLI commands
│   │   ├── index.ts         # Command registration (init, run, log, key, new)
│   │   ├── init.ts          # Interactive setup wizard
│   │   └── run.ts           # Bot startup logic
│   ├── config/              # Agent personality & protocol settings
│   ├── guardrails/          # Output validation & safety tripwires
│   ├── services/            # Message handling, memory, command parsing
│   ├── storage/             # Encrypted config & chat history stores
│   ├── tools/               # Agent-callable tools (time, calendar, etc.)
│   ├── utils/               # Google auth, banner, helpers
│   ├── bot.ts               # WhatsApp client configuration
│   └── index.ts             # Library exports for programmatic usage
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

---

## Security & Privacy

| Layer | How it works |
|-------|-------------|
| **Encrypted Storage** | API keys are encrypted with **AES-256-CBC** using a machine-derived key (hostname + username + salt). Config files are useless if copied to another machine. |
| **Ephemeral Memory** | Chat history lives only in RAM (last 15 messages per user). Cleared completely on restart. No remote databases. |
| **Guardrails** | A validation pipeline ensures the AI never exposes system config, generates offensive content, or responds to out-of-scope queries. |
| **Restrictive Permissions** | On Unix systems, config files are set to `600` (owner-only) and the storage directory to `700`. |

---

## Running with Docker

Chat Buddy includes a fully configured Docker setup. You can run the bot without installing Node.js or Chromium locally.

1. Ensure you have [Docker](https://docs.docker.com/get-docker/) and `docker-compose` installed.
2. Clone the repository and navigate into it.
3. Start the bot interactively:
   ```bash
   docker-compose run --rm chat-buddy
   ```
4. If this is your first time, you can run the setup wizard inside Docker:
   ```bash
   docker-compose run --rm chat-buddy npm run init
   ```
   *(Note: The QR code and prompts will appear directly in your terminal).*

Your configuration, WhatsApp session, and Google tokens are automatically persisted in a Docker volume so you don't lose them when the container stops.

---

## Development

```bash
# Clone the repo
git clone https://github.com/snackoverflowasad/chat-buddy.git
cd chat-buddy

# Install dependencies
npm install

# Build
npm run build

# Run in dev mode (build + start)
npm run dev
```

---

## Installation Notes
Some deprecation warnings may appear during `npm install`. 
These come from `whatsapp-web.js` internals and do not affect functionality.

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started.

Please also adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project.

---

## License

This project is licensed under the **[MIT License](LICENSE)**.

---

<div align="center">

**Built with love by [Asad Hussain](https://www.asadhussain.in/)**

[![GitHub](https://img.shields.io/badge/GitHub-snackoverflowasad-181717?style=for-the-badge&logo=github)](https://github.com/snackoverflowasad)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Asad%20Hussain-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/asad-hussain-765502319/)
[![Portfolio](https://img.shields.io/badge/Portfolio-asadhussain.in-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.asadhussain.in/)

</div>
