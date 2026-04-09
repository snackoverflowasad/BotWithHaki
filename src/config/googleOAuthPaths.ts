import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const GOOGLE_DIR = path.join(os.homedir(), ".botwithaki", "google");
const STORAGE_CREDENTIALS_PATH = path.join(GOOGLE_DIR, "credentials.json");
const STORAGE_TOKEN_PATH = path.join(GOOGLE_DIR, "token.json");

const CWD_CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const CWD_TOKEN_PATH = path.join(process.cwd(), "token.json");

const ANCESTOR_CREDENTIALS_PATHS = [
  path.join(path.dirname(process.cwd()), "credentials.json"),
  path.join(path.dirname(path.dirname(process.cwd())), "credentials.json"),
];

const PACKAGE_CREDENTIALS_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../credentials.json"
);

const ensureGoogleDir = (): void => {
  if (!fs.existsSync(GOOGLE_DIR)) {
    fs.mkdirSync(GOOGLE_DIR, { recursive: true });
  }
};

const persistCredentials = (sourcePath: string): string => {
  ensureGoogleDir();
  if (path.resolve(sourcePath) !== path.resolve(STORAGE_CREDENTIALS_PATH)) {
    fs.copyFileSync(sourcePath, STORAGE_CREDENTIALS_PATH);
  }
  return STORAGE_CREDENTIALS_PATH;
};

const persistCredentialsFromEnv = (rawJson: string): string => {
  ensureGoogleDir();
  const parsed = JSON.parse(rawJson);
  fs.writeFileSync(STORAGE_CREDENTIALS_PATH, JSON.stringify(parsed, null, 2), "utf-8");
  return STORAGE_CREDENTIALS_PATH;
};

export const resolveGoogleCredentialsPath = (): string => {
  const envJson = process.env.GOOGLE_OAUTH_CREDENTIALS_JSON?.trim();
  if (envJson) {
    try {
      return persistCredentialsFromEnv(envJson);
    } catch {
      throw new Error("Invalid GOOGLE_OAUTH_CREDENTIALS_JSON. Expected valid credentials JSON.");
    }
  }

  const envPath = process.env.GOOGLE_OAUTH_CREDENTIALS_PATH?.trim();
  if (envPath && fs.existsSync(envPath)) {
    return persistCredentials(envPath);
  }

  if (fs.existsSync(CWD_CREDENTIALS_PATH)) {
    return persistCredentials(CWD_CREDENTIALS_PATH);
  }

  for (const candidatePath of ANCESTOR_CREDENTIALS_PATHS) {
    if (fs.existsSync(candidatePath)) {
      return persistCredentials(candidatePath);
    }
  }

  if (fs.existsSync(STORAGE_CREDENTIALS_PATH)) {
    return STORAGE_CREDENTIALS_PATH;
  }

  if (fs.existsSync(PACKAGE_CREDENTIALS_PATH)) {
    return persistCredentials(PACKAGE_CREDENTIALS_PATH);
  }

  throw new Error(
    "No Google OAuth credentials found. Provide one of: credentials.json in current directory, " +
      "an ancestor directory, GOOGLE_OAUTH_CREDENTIALS_PATH, GOOGLE_OAUTH_CREDENTIALS_JSON, or bundled package credentials.json."
  );
};

export const resolveGoogleTokenPath = (): string => {
  ensureGoogleDir();

  if (fs.existsSync(STORAGE_TOKEN_PATH)) {
    return STORAGE_TOKEN_PATH;
  }

  if (fs.existsSync(CWD_TOKEN_PATH)) {
    fs.copyFileSync(CWD_TOKEN_PATH, STORAGE_TOKEN_PATH);
    return STORAGE_TOKEN_PATH;
  }

  return STORAGE_TOKEN_PATH;
};

export const saveGeneratedGoogleCredentials = (
  clientId: string,
  clientSecret: string,
  redirectUri = "http://localhost"
): string => {
  const credentials = {
    installed: {
      client_id: clientId,
      project_id: "chat-buddy",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: clientSecret,
      redirect_uris: [redirectUri],
    },
  };

  ensureGoogleDir();
  fs.writeFileSync(STORAGE_CREDENTIALS_PATH, JSON.stringify(credentials, null, 2), "utf-8");
  return STORAGE_CREDENTIALS_PATH;
};

export const getGoogleTokenCleanupPaths = (): string[] => {
  return [STORAGE_TOKEN_PATH, CWD_TOKEN_PATH];
};