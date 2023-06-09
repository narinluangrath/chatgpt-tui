import prompts from "prompts";
import { Conversation } from "../utils/conversation";
import { copy } from "./copy";
import { write } from "./write";
import { talk } from "./talk";
import { act } from "./act";

jest.mock("./copy");
jest.mock("./write");
jest.mock("./talk");
jest.mock("prompts");

describe("act function", () => {
  let conversation: Conversation;

  beforeEach(() => {
    conversation = new Conversation({ apiKey: "" });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call the talk function when input is 'r'", async () => {
    prompts.mockResolvedValue({ answer: "r" });
    await act(conversation);
    expect(talk).toHaveBeenCalledWith(conversation);
  });

  it("should call the copy function when input is 'c'", async () => {
    prompts.mockResolvedValue({ answer: "c" });
    await act(conversation);
    expect(copy).toHaveBeenCalledWith(conversation);
  });

  it("should call the write function when input is 'w'", async () => {
    prompts.mockResolvedValue({ answer: "w" });
    await act(conversation);
    expect(write).toHaveBeenCalledWith(conversation);
  });

  it("should log 'Goodbye!' when input is 'q'", async () => {
    console.log = jest.fn();
    prompts.mockResolvedValue({ answer: "q" });
    await act(conversation);
    expect(console.log).toHaveBeenCalledWith("Goodbye!");
  });
});
