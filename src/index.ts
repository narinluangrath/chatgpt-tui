const util = require("util");
const figlet = util.promisify(require("figlet"));
const chalk = require("chalk");
const { talk, act } = require("./prompts");
const { parseUserInput } = require("./parsers");
const { Conversation } = require("./utils/conversation");
const { getCredentials } = require("./utils/get-credentials");
const { program } = require("commander");

async function main({ systemMsg, userMsg }) {
  const figletText = await figlet("ChatGPT TUI");
  console.log(chalk.green.bold(figletText));
  const apiKey = await getCredentials();
  const conversation = new Conversation({ apiKey, systemMsg });
  if (!userMsg) {
    talk(conversation, false);
  } else {
    const [parsedMessage, metadata] = await parseUserInput(userMsg);
    console.log({ parsedMessage });
    await conversation.talk(parsedMessage);
    act(conversation, metadata[0]);
  }
}

program
  .option("-s, --system-msg <msg>", "preload a system message string")
  .option("-u, --user-msg <msg>", "preload a user message string");

program.parse();

main(program.opts());
