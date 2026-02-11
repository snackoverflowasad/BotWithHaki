import { Message as MessageType } from "whatsapp-web.js";
import { clearHistory, getHistory } from "./memory.service.js";

export const handleCommand = async (
  message: MessageType,
  text: string,
): Promise<void> => {
  if (text == "/") {
    await message.reply(`Welcome to bot helper dashboard : 
        - Enter /time for current time
        - Enter /schedule for setting an reminder with Asad
        - Enter /history for seeing the chat history
        - Enter /reset for reset it to null
        `);
  }

  if (text == "/time") {
    const date = new Date();
    await message.reply(
      `The current time is ${date.getHours()}:${date.getMinutes()}`,
    );
  }

  if (text == "/schedule") {
    await message.reply(
      `Asad is currently busy this week. Please feel free to reach out again next week.`,
    );
  }

  if(text == "/reset"){
    const userId = message.from;
    clearHistory(userId)
  }

  if(text == "/history"){
    const userId = message.from;
    const history = getHistory(userId);
    await message.reply(history.join("\n"));
  }

};
