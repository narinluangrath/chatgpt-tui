const {
  replacePlaceholdersWithFileContents,
} = require("./replace-placeholders-with-file-contents");
const {
  replacePlaceholdersWithFolderContents,
} = require("./replace-placeholders-with-folder-contents");
const {
  replacePlaceholdersWithWebsiteContents,
} = require("./replace-placeholders-with-website-contents");

/**
 * Parses the user input string.
 * @param str - The string to parse.
 * @return The parsed string.
 */
async function parseUserInput(str) {
  const parsers = [
    replacePlaceholdersWithFileContents,
    replacePlaceholdersWithFolderContents,
    replacePlaceholdersWithWebsiteContents,
  ];
  for (const parser of parsers) {
    str = await parser(str);
  }
  return str;
}

module.exports = {
  parseUserInput,
  replacePlaceholdersWithFileContents,
  replacePlaceholdersWithFolderContents,
  replacePlaceholdersWithWebsiteContents,
};
