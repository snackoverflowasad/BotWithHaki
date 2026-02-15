import { tool } from "@openai/agents";
import { getHistory } from "../services/memory.service.js";
import z from "zod";

export const getChatHistory = tool({
    name: "get_chat_history",
    description: "Returns the user's chat history.",
    parameters: z.object([]),
    execute: async () => {
        return getHistory;
    }
})