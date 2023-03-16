import prompts from "prompts";
import { Conversation } from "../utils/conversation";
import { parseUserInput } from "../parsers";
import { act } from "./act";
import { talk } from "./talk";

jest.mock("prompts");
jest.mock("../parsers");
jest.mock("./act");

describe("talk function", () => {
  let conversation: Conversation;

  beforeEach(() => {
    (parseUserInput as jest.Mock).mockResolvedValue(["parsed test input", []]);
    // @ts-expect-error
    conversation = {
      lastMessage: jest.fn(),
      talk: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call the act function when input is empty", async () => {
    prompts.mockResolvedValue({ input: "" });
    await talk(conversation);
    expect(act).toHaveBeenCalledWith(conversation);
  });

  it("should parse the user input and send it to the conversation", async () => {
    prompts.mockResolvedValue({ input: "test input" });
    await talk(conversation);
    expect(parseUserInput).toHaveBeenCalledWith("test input");
    expect(conversation.talk).toHaveBeenCalledWith("parsed test input");
  });

  it("should call the act function after sending user input to the conversation", async () => {
    prompts.mockResolvedValue({ input: "test input" });
    await talk(conversation);
    expect(act).toHaveBeenCalledWith(conversation);
  });
});
