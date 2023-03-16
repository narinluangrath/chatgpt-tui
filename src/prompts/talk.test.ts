const prompts = require("prompts");
const { Conversation } = require("../utils/conversation");
const { parseUserInput } = require("../parsers");
const { act } = require("./act");
const { talk } = require("./talk");

jest.mock("prompts");
jest.mock("../parsers");
jest.mock("./act");

describe("talk function", () => {
  // @ts-expect-error
  let conversation: Conversation;

  beforeEach(() => {
    parseUserInput.mockResolvedValue(["parsed test input", []]);
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
