import prompts from "prompts";
import { Conversation } from "../utils/conversation";
import { writeOutputToFile } from "../utils/write-output-to-file";
import { extractRelevent } from "./extract-relevant";
import { act } from "./act";
import { write } from "./write";

jest.mock("prompts");
jest.mock("../utils/write-output-to-file");
jest.mock("./extract-relevant");
jest.mock("./act");

describe("write function", () => {
  let conversation: Conversation;

  beforeEach(() => {
    // @ts-expect-error
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
    (extractRelevent as jest.Mock).mockResolvedValue("test content");
    await write(conversation);
    expect(writeOutputToFile).toHaveBeenCalledWith("test content", "test path");
    expect(act).toHaveBeenCalledWith(conversation);
  });
});
