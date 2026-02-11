import { Agent, OutputGuardrail, run } from "@openai/agents";
import z from "zod";

export const agentGuardrail: OutputGuardrail = {
  name: "Output Guardrail",
  execute: async (args) => {
    const agentOutput = args.agentOutput as string;
    const res = await run(checkOutput, agentOutput);
    return {
      outputInfo: res.finalOutput?.outputInfo,
      tripwireTriggered: !res.finalOutput?.isSafe,
    };
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
