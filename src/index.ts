const util = require("util");
const figlet = util.promisify(require("figlet"));
const chalk = require("chalk");
const { talk } = require("./prompts");
const { Conversation } = require("./utils/conversation");
const { getCredentials } = require("./utils/get-credentials");

async function welcome() {
  const figletText = await figlet("ChatGPT TUI");
  console.log(chalk.green.bold(figletText));
}

async function main() {
  await welcome();
  const apiKey = await getCredentials();
  const conversation = new Conversation({ apiKey });
  talk(conversation, false);
}

main();
