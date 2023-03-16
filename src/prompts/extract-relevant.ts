import prompts from "prompts";
import { highlight } from "cli-highlight";
import chalk from "chalk";
import { extractCodeBlocks } from "../utils/write-output-to-file";

async function extractRelevent(response: string) {
  const wantsCodeBlock = await prompts({
    type: "select",
    name: "wantsCodeBlock",
    message: "Do you want the entire output or just the code block?",
    choices: [
      { title: "Entire output", value: "e" },
      { title: "Code block", value: "c" },
    ],
  });
  if (wantsCodeBlock.wantsCodeBlock.toLowerCase() === "c") {
    const codeBlocks = extractCodeBlocks(response);
    if (codeBlocks.length > 1) {
      // Log each code block and its index
      codeBlocks.forEach((codeBlock, index) => {
        console.log(
          chalk.green.bold(`
******************
** CODE BLOCK ${index} **
******************
`)
        );
        console.log(highlight(codeBlock));
        console.log("");
      });
      const index = await prompts({
        type: "text",
        name: "index",
        message: "Which code block do you want? (Enter a number)",
      });
      const codeBlockIndex = parseInt(index.index, 10);
      return codeBlocks[codeBlockIndex].trim();
    } else {
      return codeBlocks[0].trim();
    }
  } else {
    return response;
  }
}

export { extractRelevent };
