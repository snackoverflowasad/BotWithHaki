import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { Client as ClientType } from "whatsapp-web.js";
import { handleMessages } from "./services/messageHandler.service.js";
import { getBanner } from "./utils/banner.js";

const { Client, LocalAuth } = pkg;
export class WhatsAppBot {
  private client: ClientType;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
        timeout: 60000,
      },
    });

    this.initializeEvents();
  }

  private initializeEvents() {
    this.client.on("qr", (qr) => {
      console.log("Scan QR to login:");
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", async () => {
      try {
        console.clear();
        await getBanner();
      } catch (err) {
        console.log(err);
      }
      // console.clear();
      // await getBanner();
    });

    this.client.on("auth_failure", (msg) => {
      console.log("Auth failed:", msg);
    });

    this.client.on("disconnected", (reason) => {
      console.log("Disconnected:", reason);

      console.log("Reconnecting...");
      this.client.initialize();
    });

    this.client.on("message", async (message) => {
      try {
        await handleMessages(message);
      } catch (err) {
        console.log("Message error:", err);
      }
    });
  }

  public start() {
    this.client.initialize().catch((err) => {
      console.log(err);
    });
  }
}
export const botRebootTime = Date.now();
