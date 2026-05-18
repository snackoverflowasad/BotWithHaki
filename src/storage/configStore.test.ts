import { describe, it, expect } from "vitest";
import { encrypt, decrypt } from "./configStore.js";

describe("configStore crypto", () => {
  it("round-trips plaintext correctly", () => {
    const secret = "sk-test-key-12345";
    const encrypted = encrypt(secret);
    expect(encrypted).not.toBe(secret);
    expect(encrypted).toContain(":");
    expect(decrypt(encrypted)).toBe(secret);
  });

  it("returns empty string for empty input", () => {
    expect(encrypt("")).toBe("");
    expect(decrypt("")).toBe("");
  });

  it("throws an error for invalid ciphertext formats", () => {
    expect(() => decrypt("invalid-ciphertext-no-colon")).toThrow("Invalid encrypted data format");
    expect(() => decrypt(":")).toThrow("Invalid encrypted data format");
  });
});
