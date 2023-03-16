import prompts from "prompts";
import { writeOutputToFile } from "../utils/write-output-to-file";
import { extractRelevent } from "./extract-relevant";
import { act } from "./act";

// @ts-expect-error
async function write(conversation: Conversation, fileHint?: string) {
  const path = await prompts({
    type: "text",
    name: "path",
    message: "Enter a file path (hit esc to go back): ",
    initial: fileHint,
  });

  if (!path.path) {
    return act(conversation);
  }

  const relevent = await extractRelevent(conversation.lastMessage().content);
  writeOutputToFile(relevent, path.path);
  console.log("Output written to file!");
  act(conversation);
}

export { write };
