const prompts = require("prompts");
const { Conversation } = require("../utils/conversation");
const { parseUserInput } = require("../parsers");
const { act } = require("./act");

// @ts-expect-error
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
  const parsedInput = await parseUserInput(input.input);
  await conversation.talk(parsedInput);
  act(conversation);
}

exports.talk = talk;
