import { replacePlaceholdersWithWebsiteContents } from "./replace-placeholders-with-website-contents";
import puppeteer from "puppeteer";

jest.mock("puppeteer");

const mockContent =
  "This is the really good website content\nAnother line of great stuff";

describe("replacePlaceholdersWithWebsiteContents", () => {
  const tempConsoleWarn = console.warn;

  beforeAll(() => {
    puppeteer.launch.mockResolvedValue({
      newPage: jest.fn().mockResolvedValue({
        goto: jest.fn(),
        evaluate: jest.fn().mockResolvedValue(mockContent),
      }),
      close: jest.fn(),
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
    console.warn = tempConsoleWarn;
  });

  it("replaces $URL(<website>) with the website content", async () => {
    const input = "Hello $URL(https://www.example.com) World";
    const output = `Hello ${mockContent} World`;
    const result = await replacePlaceholdersWithWebsiteContents(input);
    expect(result[0]).toBe(output);
  });

  it("handles multiple $URL(<website>) placeholders in the input string", async () => {
    const input =
      "1.$URL(https://www.example.com) 2.$URL(https://www.google.com) 3.$URL(https://www.github.com)";
    const output = `1.${mockContent} 2.${mockContent} 3.${mockContent}`;
    const result = await replacePlaceholdersWithWebsiteContents(input);
    expect(result[0]).toBe(output);
  });

  it("replaces $URL(<website>[start_string:end_string]) with text between start_string and end_string", async () => {
    const input = "Hello $URL(https://www.example.com/[is the:line of]) World";
    const output =
      "Hello is the really good website content\nAnother line of World";
    const result = await replacePlaceholdersWithWebsiteContents(input);
    expect(result[0]).toBe(output);
  });

  it("handles $URL(<website>) placeholders with invalid URLs", async () => {
    console.warn = jest.fn();
    puppeteer.launch.mockResolvedValue({
      newPage: jest.fn().mockResolvedValue({
        goto: jest.fn().mockRejectedValue(new Error("Invalid URL")),
      }),
      close: jest.fn(),
    });
    const input = "Hello $URL(invalid-url) World";
    const output = "Hello $URL(invalid-url) World";
    const result = await replacePlaceholdersWithWebsiteContents(input);
    expect(result[0]).toBe(output);
    expect(console.warn).toHaveBeenCalled();
  });
});
