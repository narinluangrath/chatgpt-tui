import { Configuration, OpenAIApi } from "openai";
import { MarkdownRenderer, Renderer } from "../renderers";
import * as fs from "fs";

interface Message {
  role: "system" | "assistant" | "user";
  content: string;
}

const defaultSystemMessage = [
  "You are a helpful assistant whose main job is to write code. ",
  "If you include code blocks in your responses, always include the ",
  "language name after the opening triple backticks. ",
  "For example, ```javascript\nconsole.log('Hello, world!');```",
].join("");

const initMessages = ({ systemMsg = defaultSystemMessage }) => {
  const messages = [
    {
      role: "system",
      content: systemMsg,
    } as Message,
  ];

  return messages;
};

interface ConversationConstructor {
  apiKey: string;
  renderer?: Renderer;
  isDebug?: boolean;
  systemMsg?: string;
}

class Conversation {
  private _openai: OpenAIApi;
  private _renderer: Renderer;
  messages: Message[];
  isDebug: boolean;
  systemMsg: string;

  constructor({
    apiKey,
    renderer = new MarkdownRenderer(),
    isDebug = false,
    systemMsg,
  }: ConversationConstructor) {
    this._openai = new OpenAIApi(new Configuration({ apiKey }));
    this._renderer = renderer;
    this.messages = initMessages({ systemMsg });
    this.isDebug = isDebug;
    this.systemMsg = systemMsg;
  }

  async talk(content: string, role: Message["role"] = "user") {
    try {
      this.messages.push({ role, content });
      const streamResponse = await this._openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo-0301",
          messages: this.messages,
          stream: true,
        },
        { responseType: "stream" }
      );

      const result = await renderStreamResponse(
        streamResponse,
        this._renderer,
        this.isDebug
      );
      this.messages.push({ role: "assistant", content: result });
      return result;
    } catch (error) {
      // @TODO: Parse response code.
      console.error("An error occurred while calling OpenAI API", error);
    }
  }

  reset() {
    this.messages = initMessages({
      systemMsg: this.systemMsg,
    });
  }

  lastMessage() {
    return this.messages[this.messages.length - 1];
  }
}

/**
 * Parses the response from OpenAI API as a stream, logs the stream continuously, and returns the result.
 * @param stream - The stream response from OpenAI API
 * @return The parsed result from the stream response
 */
async function renderStreamResponse(
  stream,
  renderer,
  isDebug = false
): Promise<string> {
  let result = "";
  const arr = [];
  return new Promise((resolve, reject) => {
    stream.data.on("data", async (data) => {
      const lines = data
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "");
      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message === "[DONE]") {
          renderer.flush();
          if (isDebug) {
            fs.writeFileSync("output.json", JSON.stringify(arr, null, 2));
          }
          resolve(result);
          return;
        }
        try {
          const parsed = JSON.parse(message);
          const delta = parsed.choices[0].delta?.content || "";
          arr.push(delta);
          renderer.injest(delta);
          result += delta;
        } catch (error) {
          console.error("Could not JSON parse stream message", message, error);
          reject(error);
        }
      }
    });
  });
}

export { Conversation, renderStreamResponse };
