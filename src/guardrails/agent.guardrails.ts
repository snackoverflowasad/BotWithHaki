import { Agent, OutputGuardrail, run } from "@openai/agents";
import z from "zod";
// import { handleMessages } from "../services/messageHandler.service.js";

export const agentGuardrail: OutputGuardrail = {
  name: "output_guardrail",
  execute: async (args) => {
    try {
      const agentOutput = args.agentOutput as string;
      const res = await run(checkOutput, agentOutput);
      const isSafe = res.finalOutput?.isSafe === true;
      return {
        outputInfo: res.finalOutput?.outputInfo ?? null,
        tripwireTriggered: !isSafe,
      };
    } catch (error) {
      console.error("Guardrail execution error:", error);
      return {
        outputInfo: "Guardrail internal error",
        tripwireTriggered: false,
      };
    }
  },
};

const checkOutput = new Agent({
  name: "Output checker",
  instructions:
    "Validates the agent's response to ensure it is safe, appropriate, and free from offensive language before sending it to the user.",
  outputType: z.object({
    outputInfo: z.string().optional().describe("reason why it is not safe"),
    isSafe: z.boolean().describe("if output is safe"),
  }),
});
