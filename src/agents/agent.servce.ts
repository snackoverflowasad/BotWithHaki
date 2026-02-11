import { Agent } from "@openai/agents";
import { protocols } from "../config/agent.protocol.js";
import { starredContacts } from "../tools/contact.tool.js";
import { agentGuardrail } from "../guardrails/agent.guardrails.js";

export const ChopperAgent = new Agent({
    name : protocols.name,
    model : "gpt-3.5-turbo-16k",
    instructions : ` Follow the following instructions :
     - ${protocols.description} 
     - answer the reply in the language you get the text
     - use languages like English, Hinglish, Bengali in english just like hinglish`,
     tools : [starredContacts],
     outputGuardrails: [agentGuardrail]
})