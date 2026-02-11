import { Message as MessageType } from "whatsapp-web.js";

export const handleCommand = async (
  message: MessageType,
  text: string,
): Promise<void> => {
  if (text == "/") {
    await message.reply(`Welcome to bot helper dashboard : 
        - Enter /time for current time
        - Enter /schedule for setting an reminder with Asad`);
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
};
