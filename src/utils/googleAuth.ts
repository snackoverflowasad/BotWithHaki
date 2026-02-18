import { google } from "googleapis";
import fs from "fs";
import path from "path";

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

export async function getAuth() {
  try {
    // Load OAuth client credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));

    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    // Load saved token
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));

    oAuth2Client.setCredentials(token);

    return oAuth2Client;
  } catch (error: any) {
    console.error("Google Auth Error:", error.message);

    throw new Error(
      "Authentication failed. Make sure credentials.json and token.json exist.",
    );
  }
}
