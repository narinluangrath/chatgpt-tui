const prompts = require("prompts");
const { Conversation } = require("../utils/conversation");
// @ts-expect-error
async function act(conversation: Conversation) {
  // Circular imports causing problems...
  const { copy } = require("./copy");
  const { write } = require("./write");
  const { talk } = require("./talk");

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
      write(conversation);
      break;
    case "q":
      console.log("Goodbye!");
      break;
  }
}

exports.act = act;
