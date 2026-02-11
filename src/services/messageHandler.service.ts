import { protocols } from "../config/agent.protocol.js";
import { Client as ClientType, Message as MessageType } from "whatsapp-web.js";
import { handleCommand } from "./command.service.js";
import { getHistory, storeMessage } from "./memory.service.js";

export const handleMessages = async (message: MessageType): Promise<void> => {
  // storing
  const userId = message.from;
  storeMessage(userId, message.body);
  const history = getHistory(userId);
  console.log("History:", history);

  // Ignore messages from groups
  if (message.from.endsWith("@g.us") && !protocols.allowGroupReplies) {
    console.log("Received a message from a group. Ignoring...");
    return;
  }
  // ignoring empty message
  if (!message.body) {
    return;
  }

  // message and contact logic
  const contact = await message.getContact();
  const name = contact.pushname || contact.number;
  const text = message.body.trim().toLowerCase();
  console.log("New Message Received:");
  console.log("From Name:", name);
  console.log("Message:", text);

  // handling specific commands
  if (text.startsWith("/")) {
    await handleCommand(message, text);
  }

  if (text == "hi" || text == "hello" || text == "hey") {
    await message.reply(
      `Hi ${name}! I'm ${protocols.name}. Asad is currently busy, so I’ll be handling the conversation for now. How can I help you today?`,
    );
  }
};
