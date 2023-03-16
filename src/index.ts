import * as util from "util";
import _figlet from "figlet";
import chalk from "chalk";
import { talk, act } from "./prompts";
import { parseUserInput } from "./parsers";
import { Conversation } from "./utils/conversation";
import { getCredentials } from "./utils/get-credentials";
import { program } from "commander";

const figlet = util.promisify(_figlet);
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
