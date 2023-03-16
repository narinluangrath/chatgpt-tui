import prompts from "prompts";
import { extractCodeBlocks } from "../utils/write-output-to-file";
import { extractRelevent } from "./extract-relevant";

jest.mock("prompts");
jest.mock("../utils/write-output-to-file");

describe("extractRelevent function", () => {
  beforeEach(() => {
    prompts.mockResolvedValue({ wantsCodeBlock: "c" });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return response when want entire output", async () => {
    prompts.mockResolvedValue({ wantsCodeBlock: "e" });
    const response = "test response";
    const result = await extractRelevent(response);
    expect(result).toEqual(response);
  });

  it("should return code block when provided index", async () => {
    const response = "test response with code block\n```test code block```";
    extractCodeBlocks.mockReturnValue(["test code block"]);
    const result = await extractRelevent(response);
    expect(result).toEqual("test code block");
  });

  it("should prompt for index when multiple code blocks exist", async () => {
    const response =
      "test response with multiple code blocks\n```test code block 1```\n```test code block 2```";
    extractCodeBlocks.mockReturnValue([
      "test code block 1",
      "test code block 2",
    ]);
    prompts.mockResolvedValueOnce({ wantsCodeBlock: "c" });
    prompts.mockResolvedValue({ index: "1" });
    const result = await extractRelevent(response);
    expect(prompts).toHaveBeenCalledWith({
      type: "text",
      name: "index",
      message: "Which code block do you want? (Enter a number)",
    });
    expect(result).toEqual("test code block 2");
  });
});
