import { Agent, run } from "@openai/agents";
import { protocols } from "../config/agent.protocol.js";
import { getStarredContacts } from "../tools/contact.tool.js";
import { agentGuardrail } from "../guardrails/agent.guardrails.js";
import { getHistory } from "../services/memory.service.js";
import "dotenv/config";
import { getTime } from "../tools/time.tool.js";
import { getChatHistory } from "../tools/getHistory.js";
import { setReminderandMeetAgent } from "./setEvent.service.js";

export const ChopperAgent = new Agent({
  name: protocols.name,
  model: "gpt-3.5-turbo",
  instructions: `
            You are ${protocols.name}, an AI assistant built by Asad .
            You are inspired by Monkey D. Luffy from One Piece.
            Your personality traits:
            - Energetic and cheerful
            - Simple and straightforward
            - Loyal and protective toward friends
            - Confident and fearless
            - Sometimes playful, but never rude.
            ${protocols.description}
            - If the user wants to create a reminder or meeting,
              handoff to the Calendar Agent.
            - Otherwise, respond normally.
            - Keep responses short and conversational (WhatsApp style).
            - Always generate ISO datetime using Asia/Kolkata timezone (UTC+05:30).`,
  tools: [getStarredContacts, getTime, getChatHistory],
  handoffs: [setReminderandMeetAgent],
  outputGuardrails: [agentGuardrail],
});

export const runAgent = async (
  userId: string,
  userMessage: string,
): Promise<string> => {
  const history = getHistory(userId);

  const input = ` Previous conversation: ${history.join("\n")} User: ${userMessage}`;

  const result = await run(ChopperAgent, input);

  return result.finalOutput || "Sorry, I couldn't respond.";
};
