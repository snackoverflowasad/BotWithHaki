import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { Client as ClientType } from "whatsapp-web.js";
import { handleMessages } from "./services/messageHandler.service.js";

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
          "--disable-gpu",
          "--disable-web-security",
        ],
        timeout: 60000,
      },
    });

    this.initializeEvents();
  }

  private initializeEvents() {
    // disconnect error
    this.client.on("disconnected", (reason) => {
      console.log("Client was logged out:", reason);
    });

    // auth fail error
    this.client.on("auth_failure", (msg) => {
      console.log("Auth failed:", msg);
    });

    // QR Code Event
    this.client.on("qr", (qr) => {
      console.log("Scan this QR code to login:");
      qrcode.generate(qr, { small: true });
    });

    // Ready Event
    this.client.on("ready", () => {
      console.log("WhatsApp Bot is READY and connected!");
    });

    // Message Event
    this.client.on("message", async (message) => {
      await handleMessages(message);
    });
  }

  public start() {
    this.client.initialize();
  }
}
