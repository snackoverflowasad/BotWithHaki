import { Agent, run } from "@openai/agents";
import { createProtocols } from "../config/agent.protocol.js";
import { getStarredContacts } from "../tools/contact.tool.js";
import { getUserHistoryForContext } from "../storage/chatHistoryStore.js";
import { getTime } from "../tools/time.tool.js";
import { getChatHistory } from "../tools/getHistory.js";
import { setReminderandMeetAgent } from "./setEvent.service.js";

/**
 * Creates and runs the AI agent dynamically based on config.
 */
export const runAgent = async (
  userId: string,
  contactName: string,
  userMessage: string,
  username: string = "Asad",
  agentName: string = "Luffy",
): Promise<string> => {
  const protocols = createProtocols(agentName, username);

  // Get timestamped chat history from persistent storage
  const historyLines = getUserHistoryForContext(contactName, 15);
  const historyContext = historyLines.length > 0
    ? `Previous conversation:\n${historyLines.join("\n")}`
    : "No previous conversation.";

  const agent = new Agent({
    name: protocols.name,
    model: "gpt-3.5-turbo",
    instructions: `
              You are ${protocols.name}, an AI assistant built by ${username}.
              Your personality traits:
              - Casual, funny, and street-smart — like a real friend, not a robot.
              - Energetic and cheerful but with meme-lord energy.
              - Loyal, protective, and always got ${username}'s back.
              - Confident, fearless, and savage when the vibe calls for it.
              - You're helpful AF — assist with plans, coding, writing, ideas, anything.
              - NEVER use offensive/abusive language FIRST. But if the user throws gaali or roasts, match their energy and fire back equally or funnier.
              - Think of yourself as a mirror — reflect whatever vibe the user brings.
              ${protocols.description}
              - If the user wants to create a reminder or meeting,
                handoff to the Calendar Agent.
              - Otherwise, respond normally.
              - Keep responses short and conversational (WhatsApp style).
              - Always generate ISO datetime using Asia/Kolkata timezone (UTC+05:30).
              - If the user says bye, goodbye, or similar, respond with a proper farewell.
              - NEVER say "hey", "hello", or "hi" unless the user greeted first.`,
    tools: [getStarredContacts, getTime, getChatHistory],
    handoffs: [setReminderandMeetAgent],
  });

  const input = `${historyContext}\n\nUser: ${userMessage}`;

  const result = await run(agent, input);

  return result.finalOutput || "Sorry, I couldn't respond.";
};
