const fs = require("fs");
const util = require("util");

/**
 * @param str A string representing a markdown-style document with code blocks.
 * @returns An array of objects, each containing a code block, the language of the code block, and the filename of the code block.
 *
 * @example
 * const str = `
 * # Blah blah blah...
 *
 * This is a code block:
 * ```js
 * console.log("This is a code block");
 * ```
 *
 * This is another code block:
 * ```ts
 * console.log("This is another code block");
 * ```
 *
 * blah blah blah...
 * `;
 *
 * extractCodeBlocks(str);
 * // [
 * //   'console.log("This is a code block");',
 * //   'console.log("This is another code block");',
 * // ]
 */
function extractCodeBlocks(str: string): string[] {
  const regexp = /```.*\n([\s\S]+?)\n```/g;
  return [...str.matchAll(regexp)].map((match) => match[1]);
}

/**
 * Writes the output to a file selected by the user.
 * @param output - The output to write to a file.
 * @param filename - The name of the file to write to.
 */
async function writeOutputToFile(output, filename) {
  const writeFile = util.promisify(fs.writeFile);

  try {
    await writeFile(filename, output);
    console.log(`Written to file: ${filename}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { writeOutputToFile, extractCodeBlocks };
