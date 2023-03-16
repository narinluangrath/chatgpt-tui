import prompts from "prompts";
import { Conversation } from "../utils/conversation";

async function act(conversation: Conversation, fileHint?: string) {
  // Circular imports causing problems...
  const { copy } = await import("./copy");
  const { write } = await import("./write");
  const { talk } = await import("./talk");

  console.log("\n");
  const input = await prompts({
    type: "select",
    name: "answer",
    message: "What would you like to do next?",
    choices: [
      { title: "💬 Reply", value: "r" },
      { title: "📋 Copy to clipboard", value: "c" },
      { title: "📁 Write to file", value: "w" },
      { title: "👋 Quit", value: "q" },
    ],
  });

  switch (input.answer.toLowerCase()) {
    case "r":
      talk(conversation);
      break;
    case "c":
      copy(conversation);
      break;
    case "w":
      if (!fileHint) {
        write(conversation);
      } else {
        write(conversation, fileHint);
      }
      break;
    case "q":
      console.log("Goodbye!");
      break;
  }
}

export { act };
