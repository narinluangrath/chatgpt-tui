import clipboardy from "node-clipboardy";
import { act } from "./act";
import { extractRelevent } from "./extract-relevant";
import { Conversation } from "../utils";

async function copy(conversation: Conversation) {
  const relevent = await extractRelevent(conversation.lastMessage().content);
  clipboardy.writeSync(relevent);
  console.log("Copied to clipboard!");
  act(conversation);
}

export { copy };
