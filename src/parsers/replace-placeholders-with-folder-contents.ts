import * as fs from "fs";
import * as path from "path";

/*
 * Replaces $FOLDER(<folder path>) with the contents of all files in the folder.
 * @param str - The string to parse.
 * @return The parsed string with folder contents replaced.
 */
function replacePlaceholdersWithFolderContents(str) {
  const matches = str.match(/\$FOLDER\((.*?)\)/g);
  if (!matches) {
    return [str, []];
  }

  const folderNames = [];
  for (const match of matches) {
    const folderPath = match.slice("$FOLDER(".length, -1);
    try {
      const files = fs.readdirSync(folderPath);
      const fileContents = files
        .filter((filename) => path.extname(filename) !== "")
        .map((filename) => {
          const filePath = path.join(folderPath, filename);
          const fileContent = fs.readFileSync(filePath, "utf8");
          return `\n\n${filename}\n\n${fileContent}`;
        })
        .join("\n\n");
      str = str.replace(match, fileContents);
      folderNames.push(folderPath);
    } catch (err) {
      console.warn(`Could not replace ${match}: ${err.message}`);
    }
  }

  return [str, folderNames];
}

export { replacePlaceholdersWithFolderContents };
