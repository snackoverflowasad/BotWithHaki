import { authenticate } from "@google-cloud/local-auth";
import fs from "fs";
import path from "path";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function generate() {
  const auth = await authenticate({
    keyfilePath: path.join(process.cwd(), "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  //   svainf token file mannualy
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(auth.credentials, null, 2));

  console.log("token.json has been created successfully!");
}

generate().catch(console.error);
