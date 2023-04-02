import * as util from "util";
import _figlet from "figlet";
import chalk from "chalk";
import { program } from "commander";
import { talk, act } from "./prompts";
import { parseUserInput } from "./parsers";
import { Conversation } from "./utils/conversation";
import { getCredentials } from "./utils/get-credentials";
import { setConfig } from "./utils/config";

const figlet = util.promisify(_figlet);
async function main({ systemMsg, userMsg, model, debug }) {
  if (debug) {
    setConfig({ debug });
  }
  const figletText = await figlet("ChatGPT TUI");
  console.log(chalk.green.bold(figletText));
  const apiKey = await getCredentials();
  const conversation = new Conversation({ apiKey, systemMsg, model });
  if (!userMsg) {
    talk(conversation, false);
  } else {
    const [parsedMessage, metadata] = await parseUserInput(userMsg);
    await conversation.talk(parsedMessage);
    act(conversation, metadata[0]);
  }
}

program
  .option("-s, --system-msg <msg>", "preload a system message string")
  .option("-u, --user-msg <msg>", "preload a user message string")
  .option("-d, --debug", "print out user messages post parsing")
  .option(
    "-m, --model <model>",
    "model to use for chat, defaults to gpt-3.5-turbo-0301"
  );

program.parse();

main(program.opts());
