const { Configuration, OpenAIApi } = require("openai");
const { MarkdownRenderer, Renderer } = require("../renderers");
const fs = require("fs");

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

const initMessages = ({ systemMsg = defaultSystemMessage, userMsg }) => {
  const messages = [
    {
      role: "system",
      content: systemMsg,
    } as Message,
  ];

  if (userMsg) {
    messages.push({ role: "user", content: userMsg } as Message);
  }

  return messages;
};

interface ConversationConstructor {
  apiKey: string;
  // @ts-expect-error
  renderer?: Renderer;
  isDebug?: boolean;
  systemMsg?: string;
  userMsg?: string;
}

class Conversation {
  // @ts-expect-error (TS doesn't know about the OpenAIApi class)
  private _openai: OpenAIApi;
  // @ts-expect-error
  private _renderer: Renderer;
  messages: Message[];
  isDebug: boolean;
  systemMsg: string;
  userMsg: string;

  constructor({
    apiKey,
    renderer = new MarkdownRenderer(),
    isDebug = false,
    systemMsg,
    userMsg,
  }: ConversationConstructor) {
    this._openai = new OpenAIApi(new Configuration({ apiKey }));
    this._renderer = renderer;
    this.messages = initMessages({ systemMsg, userMsg });
    this.isDebug = isDebug;
    this.systemMsg = systemMsg;
    this.userMsg = userMsg;
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
      userMsg: this.userMsg,
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

module.exports = { Conversation, renderStreamResponse };
