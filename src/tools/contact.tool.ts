import { tool } from "@openai/agents";
import { z } from "zod";
import { contacts } from "../data/data.js";

export const getStarredContacts = tool({
  name: "get_starred_contacts",
  description: "Returns the user's important and close contact groups.",

  parameters: z.object({}),

  execute: async () => {
    return {
      importants: contacts.importants,
      friends: contacts.friends,
    };
  },
});
