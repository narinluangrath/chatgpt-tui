import { Conversation, renderStreamResponse } from "./conversation";
import { MarkdownRenderer } from "../renderers";
import { OpenAIApi } from "openai";

jest.mock("openai");

describe("Conversation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a Conversation instance with default renderer", () => {
    const conversation = new Conversation({ apiKey: "test-api-key" });

    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation["messages"]).toEqual([
      {
        role: "system",
        content:
          "You are a helpful assistant whose main job is to write code. If you include code blocks in your responses, always include the language name after the opening triple backticks. For example, ```javascript\nconsole.log('Hello, world!');```",
      },
    ]);
    expect(conversation["_openai"]).toBeInstanceOf(OpenAIApi);
    expect(conversation["_renderer"]).toBeInstanceOf(MarkdownRenderer);
  });

  it("should create a Conversation instance with custom renderer", () => {
    const mockRenderer = { foo: () => {}, bar: () => {} };
    const conversation = new Conversation({
      apiKey: "test-api-key",
      renderer: mockRenderer,
    });

    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation["messages"]).toEqual([
      {
        role: "system",
        content:
          "You are a helpful assistant whose main job is to write code. If you include code blocks in your responses, always include the language name after the opening triple backticks. For example, ```javascript\nconsole.log('Hello, world!');```",
      },
    ]);
    expect(conversation["_openai"]).toBeInstanceOf(OpenAIApi);
    expect(conversation["_renderer"]).toBe(mockRenderer);
  });

  it("should add user message to messages and talk to assistant", async () => {
    const conversation = new Conversation({ apiKey: "test-api-key" });

    await conversation.talk("Hi");

    expect(conversation["messages"]).toHaveLength(2);
    expect(conversation["messages"][1]).toEqual({
      role: "user",
      content: "Hi",
    });
    expect(OpenAIApi.prototype.createChatCompletion).toHaveBeenCalledTimes(1);
  });

  it("should handle error during talk", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const conversation = new Conversation({ apiKey: "test-api-key" });
    OpenAIApi.prototype.createChatCompletion.mockRejectedValueOnce("error");

    await conversation.talk("Hi");

    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it("should reset messages to initial messages", () => {
    const conversation = new Conversation({ apiKey: "test-api-key" });
    conversation["messages"] = [{ role: "assistant", content: "Hello" }];

    conversation.reset();

    expect(conversation["messages"]).toEqual([
      {
        role: "system",
        content:
          "You are a helpful assistant whose main job is to write code. If you include code blocks in your responses, always include the language name after the opening triple backticks. For example, ```javascript\nconsole.log('Hello, world!');```",
      },
    ]);
  });
});

describe("renderStreamResponse", () => {
  it("should render stream response and return result", async () => {
    const mockRenderer = {
      injest: jest.fn(),
      flush: jest.fn(),
    };
    const mockStream = {
      data: {
        on: jest.fn((event, callback) => {
          if (event === "data") {
            for (const message of [
              'data: {"choices": [{"delta": {"content": "Some delta"}}]}\n',
              "data: [DONE]",
            ]) {
              callback(message);
            }
          }
        }),
      },
    };
    const result = await renderStreamResponse(mockStream, mockRenderer);

    expect(result).toBe("Some delta");
    expect(mockRenderer.injest).toHaveBeenCalledTimes(1);
    expect(mockRenderer.flush).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if JSON parsing fails", async () => {
    const mockRenderer = {
      injest: jest.fn(),
      flush: jest.fn(),
    };
    const mockStream = {
      data: {
        on: jest.fn((event, callback) => {
          if (event === "data") {
            callback("data: invalid-json\n");
          }
        }),
      },
    };

    await expect(
      renderStreamResponse(mockStream, mockRenderer)
    ).rejects.toThrow();
  });
});
