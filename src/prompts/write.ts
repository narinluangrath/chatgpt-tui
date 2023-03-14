const prompts = require("prompts");
const { writeOutputToFile } = require("../utils/write-output-to-file");
const { extractRelevent } = require("./extract-relevant");
const { act } = require("./act");

// @ts-expect-error
async function write(conversation: Conversation) {
  const path = await prompts({
    type: "text",
    name: "path",
    message: "Enter a file path (hit esc to go back): ",
  });

  if (!path.path) {
    return act(conversation);
  }

  const relevent = await extractRelevent(conversation.lastMessage().content);
  writeOutputToFile(relevent, path.path);
  console.log("Output written to file!");
  act(conversation);
}

exports.write = write;
