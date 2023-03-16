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
  const allMetadata = [];
  const parsers = [
    replacePlaceholdersWithFileContents,
    replacePlaceholdersWithFolderContents,
    replacePlaceholdersWithWebsiteContents,
  ];
  for (const parser of parsers) {
    const [parsed, metadata] = await parser(str);
    str = parsed;
    if (parser === replacePlaceholdersWithFileContents) {
      allMetadata.push(...metadata);
    } else {
      // I don't know what to do with the other metadata.
    }
  }
  return [str, allMetadata];
}

export {
  parseUserInput,
  replacePlaceholdersWithFileContents,
  replacePlaceholdersWithFolderContents,
  replacePlaceholdersWithWebsiteContents,
};
