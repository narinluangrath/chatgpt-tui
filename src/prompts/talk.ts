import prompts from "prompts";
import { Conversation } from "../utils/conversation";
import { parseUserInput } from "../parsers";
import { act } from "./act";

async function talk(conversation: Conversation, canGoBack = true) {
  console.log("");
  const input = await prompts({
    type: "text",
    name: "input",
    message: `✍️  Enter a message${canGoBack ? " (hit esc to go back)" : ""}: `,
  });

  if (!input.input) {
    return act(conversation);
  }

  console.log("");
  const [parsedInput, metadata] = await parseUserInput(input.input);
  const firstFile = metadata[0];
  await conversation.talk(parsedInput);
  if (!firstFile) {
    act(conversation);
  } else {
    act(conversation, firstFile);
  }
}

export { talk };
