import { tool } from "@openai/agents";
import z from "zod";

export const getTime = tool({
    name: "get_time",
    description: "Returns the current time.",
    parameters: z.object({}),
    execute: async () => {
        return new Date().toLocaleTimeString();
    }
})