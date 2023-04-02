import { replacePlaceholdersWithFileContents } from "./replace-placeholders-with-file-contents";
import { replacePlaceholdersWithFolderContents } from "./replace-placeholders-with-folder-contents";
import { replacePlaceholdersWithWebsiteContents } from "./replace-placeholders-with-website-contents";
import { getConfig } from "../utils/config";

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
  if (getConfig().debug) {
    console.log("Parsed user input: ");
    console.log(str);
    console.log("");
  }
  return [str, allMetadata];
}

export {
  parseUserInput,
  replacePlaceholdersWithFileContents,
  replacePlaceholdersWithFolderContents,
  replacePlaceholdersWithWebsiteContents,
};
