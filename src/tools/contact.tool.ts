import { tool } from "@openai/agents";
import { contacts } from "../data/data.js";

export const starredContacts = tool({
  name: "Close Contacts",
  description: "Get the user's starred/important/favourite contacts",
  parameters: undefined,
  execute: async () => {
    return [contacts.importants.number, contacts.friends.number];
  },
});
