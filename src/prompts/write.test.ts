const prompts = require("prompts");
const { writeOutputToFile } = require("../utils/write-output-to-file");
const { extractRelevent } = require("./extract-relevant");
const { act } = require("./act");
const { write } = require("./write");

jest.mock("prompts");
jest.mock("../utils/write-output-to-file");
jest.mock("./extract-relevant");
jest.mock("./act");

describe("write function", () => {
  // @ts-expect-error
  let conversation: Conversation;

  beforeEach(() => {
    conversation = {
      lastMessage: jest.fn().mockReturnValue({ content: "test content" }),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call act function with given conversation object when input is empty", async () => {
    prompts.mockResolvedValue({ path: "" });
    await write(conversation);
    expect(act).toHaveBeenCalledWith(conversation);
  });

  it("should write the output to the given file path and call act function with given conversation object", async () => {
    prompts.mockResolvedValue({ path: "test path" });
    extractRelevent.mockResolvedValue("test content");
    await write(conversation);
    expect(writeOutputToFile).toHaveBeenCalledWith("test content", "test path");
    expect(act).toHaveBeenCalledWith(conversation);
  });
});
