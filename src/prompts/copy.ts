const clipboardy = require("node-clipboardy");
const { act } = require("./act");
const { extractRelevent } = require("./extract-relevant");

// @ts-expect-error
async function copy(conversation: Conversation) {
  const relevent = await extractRelevent(conversation.lastMessage().content);
  clipboardy.writeSync(relevent);
  console.log("Copied to clipboard!");
  act(conversation);
}

exports.copy = copy;
