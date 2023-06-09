import clipboardy from "node-clipboardy";
import { act } from "./act";
import { extractRelevent } from "./extract-relevant";
import { copy } from "./copy";

jest.mock("node-clipboardy");
jest.mock("./act");
jest.mock("./extract-relevant");

describe("copy function", () => {
  let conversation;

  beforeEach(() => {
    conversation = {
      lastMessage: jest.fn().mockReturnValue({
        content: "test content",
      }),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should extract relevant information from the last message and copy it to clipboard", async () => {
    (extractRelevent as jest.Mock).mockResolvedValue("test relevant");
    await copy(conversation);
    expect(clipboardy.writeSync).toHaveBeenCalledWith("test relevant");
  });

  it("should call act function with given conversation objet", async () => {
    (extractRelevent as jest.Mock).mockResolvedValue("test relevant");
    await copy(conversation);
    expect(act).toHaveBeenCalledWith(conversation);
  });
});
