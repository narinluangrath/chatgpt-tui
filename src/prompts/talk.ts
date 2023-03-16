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
  const [parsedInput, metadata] = await parseUserInput(input.input);
  console.log({ parsedInput });
  const firstFile = metadata[0];
  await conversation.talk(parsedInput);
  if (!firstFile) {
    act(conversation);
  } else {
    act(conversation, firstFile);
  }
}

exports.talk = talk;
