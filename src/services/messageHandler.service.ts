import { Message as MessageType } from "whatsapp-web.js";
import { runAgent } from "../agents/agent.servce.js";
import { botRebootTime } from "../bot.js";
import { protocols } from "../config/agent.protocol.js";
import { storeMessage } from "./memory.service.js";

export const handleMessages = async (message: MessageType): Promise<void> => {
  // Ignore bot's own messages
  if (message.fromMe) return;

  // Ignore old synced messages
  if (message.timestamp * 1000 < botRebootTime) return;

  //  Ignore empty
  if (!message.body) return;

  const userId = message.from;
  const text = message.body.trim().toLowerCase();

  // Ignore groups if disabled
  if (message.from.endsWith("@g.us") && !protocols.allowGroupReplies) {
    return;
  }

  // Store normalized message
  storeMessage(userId, text);
  const contact = await message.getContact();
  const name = contact.pushname || contact.number;
  console.log(`${name}: ${text}`);

  // Commands
  if (text.startsWith("/")) {
    await handleMessages(message);
    return;
  }

  // Greeting shortcut
  if (["hi", "hello", "hey"].includes(text)) {
    await message.reply(
      `Hi ${name}! I'm ${protocols.name}. Asad is currently busy, so I’ll be handling the conversation for now. How can I help you today?`,
    );
    return;
  }

  // agent reply
  try {
    const reply = await runAgent(userId, text);
    await message.reply(reply);
  } catch (error) {
    console.log("Tripwire triggered:", error);
    await message.reply("I cannot respond to that request.");
  }
};
