const fs = require("fs");

/**
 * Replaces $FILE(<file name>[start_line:end_line]) with the contents of the file.
 * @param str - The string to parse.
 * @return The parsed string with file contents replaced.
 */
function replacePlaceholdersWithFileContents(str) {
  const matches = str.match(/\$FILE\((.*?)\)/g);
  if (!matches) {
    return [str, []];
  }

  const fileNames = [];
  for (const match of matches) {
    const [fileName, range] = match.slice("$FILE(".length, -1).split("[");
    let startLine = 1;
    let endLine = Infinity;

    if (range) {
      [startLine, endLine] = range
        .slice(0, -1)
        .split(":")
        .map((n) => parseInt(n));
    }

    try {
      const fileContent = fs.readFileSync(fileName, "utf8");
      const fileLines = fileContent.split("\n");
      const requestedContent = fileLines
        .slice(startLine - 1, endLine)
        .join("\n");

      str = str.replace(match, requestedContent);
      fileNames.push(fileName);
    } catch (err) {
      console.warn(`Could not replace ${match}: ${err.message}`);
    }
  }

  return [str, fileNames];
}

module.exports = { replacePlaceholdersWithFileContents };
