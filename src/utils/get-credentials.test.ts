import { getCredentials, validateApiKey } from "./get-credentials";
import * as fs from "fs";
import prompts from "prompts";

jest.mock("fs");
jest.mock("prompts");

const validApiKey = "sk-123456789012345678901234567890123456789012345678";

describe("validateApiKey", () => {
  it("should return an error when the API key does not start with 'sk-'", () => {
    const result = validateApiKey("abc123");
    expect(result).toBe("API key must start with 'sk-'");
  });

  it("should return an error when the API key has the wrong length", () => {
    const result = validateApiKey(
      "sk-1234567890123456789012345678901234567890"
    );
    expect(result).toBe("API key must be exactly 51 characters long");
  });

  it("should return true when the API key is valid", () => {
    const result = validateApiKey(validApiKey);
    expect(result).toBe(true);
  });
});

describe("getCredentials function", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.readFileSync as jest.Mock).mockReturnValue("");
    prompts.mockClear();
    prompts.mockResolvedValue({ apiKey: validApiKey });
  });

  it("creates ~/.gpt folder if it does not exist", async () => {
    await getCredentials();

    expect(fs.existsSync).toHaveBeenCalledWith(`${process.env.HOME}/.gpt`);
    expect(fs.mkdirSync).toHaveBeenCalledWith(`${process.env.HOME}/.gpt`);
  });

  it("prompts user to enter API key if ~/.gpt/credentials does not exist", async () => {
    const apiKey = await getCredentials();

    expect(prompts).toHaveBeenCalledWith({
      type: "password",
      name: "apiKey",
      message: "Enter your API key:",
      validate: expect.any(Function),
    });

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `${process.env.HOME}/.gpt/credentials`,
      validApiKey
    );

    expect(apiKey).toEqual(validApiKey);
  });

  it("loads API key from ~/.gpt/credentials if it exists", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(validApiKey);

    const apiKey = await getCredentials();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      `${process.env.HOME}/.gpt/credentials`,
      { encoding: "utf8" }
    );

    expect(apiKey).toEqual(validApiKey);
  });
});
