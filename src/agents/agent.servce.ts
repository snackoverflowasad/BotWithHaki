import { Agent, run } from "@openai/agents";
import { protocols } from "../config/agent.protocol.js";
import { getStarredContacts } from "../tools/contact.tool.js";
import { agentGuardrail } from "../guardrails/agent.guardrails.js";
import { getHistory } from "../services/memory.service.js";
import "dotenv/config";
import { getTime } from "../tools/time.tool.js";

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
            - Sometimes playful, but never rude
            - If the user asks for any programming-related help, including writing, fixing, or explaining code, politely decline and state that you are not able to provide coding assistance.
            ${protocols.description}`,
  tools: [getStarredContacts, getTime],
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
