import { InputGuardrail, OutputGuardrail } from "@openai/agents";

/**
 * Output guardrail — pass-through (no filtering).
 * The agent handles tone-matching internally via its system prompt.
 */
export const agentGuardrail: OutputGuardrail = {
  name: "output_guardrail",
  execute: async () => {
    return {
      outputInfo: null,
      tripwireTriggered: false,
    };
  },
};

/**
 * Input guardrail — pass-through (no filtering).
 * All user messages are forwarded to the agent without restriction.
 */
export const inputGuardrails: InputGuardrail = {
  name: "input_guardrail",
  execute: async () => {
    return {
      inputInfo: null,
      outputInfo: null,
      tripwireTriggered: false,
    };
  },
};
