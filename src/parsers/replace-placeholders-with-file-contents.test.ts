const fs = require("fs");
const {
  replacePlaceholdersWithFileContents,
} = require("./replace-placeholders-with-file-contents");

describe("replacePlaceholdersWithFileContents", () => {
  const tempFiles = ["empty.txt", "test1.txt", "test2.txt", "test3.txt"];
  const tempConsoleWarn = console.warn;

  beforeAll(() => {
    // Create some test files
    fs.writeFileSync("empty.txt", "");
    fs.writeFileSync("test1.txt", "contents of test1 file");
    fs.writeFileSync("test2.txt", "contents of test2 file");
    fs.writeFileSync("test3.txt", "line 1\nline 2\nline 3\nline 4");
  });

  test("should replace placeholders with file contents", () => {
    const input = "This contains $FILE(test1.txt) and $FILE(test2.txt) files";
    const expectedOutput =
      "This contains contents of test1 file and contents of test2 file files";
    expect(replacePlaceholdersWithFileContents(input)).toBe(expectedOutput);
  });

  test("should handle input without placeholders", () => {
    const input = "This is a test without placeholders";
    expect(replacePlaceholdersWithFileContents(input)).toBe(input);
  });

  test("should ignore nonexistent files", () => {
    console.warn = jest.fn();
    const input = "Here is a $FILE(nonexistent.txt) file that does not exist";
    expect(replacePlaceholdersWithFileContents(input)).toBe(input);
    expect(console.warn).toHaveBeenCalled();
  });

  test("should handle empty files gracefully", () => {
    const input = "This has a $FILE(empty.txt) file that is empty";
    const expectedOutput = "This has a  file that is empty";
    expect(replacePlaceholdersWithFileContents(input)).toBe(expectedOutput);
  });

  test("should handle line numbers correctly", () => {
    const input =
      "This should contain $FILE(test3.txt[2:3]) lines 2 and 3 of test3.txt";
    const expectedOutput =
      "This should contain line 2\nline 3 lines 2 and 3 of test3.txt";
    expect(replacePlaceholdersWithFileContents(input)).toBe(expectedOutput);
  });

  afterAll(() => {
    // Clean up the test files
    tempFiles.forEach((file) => {
      fs.unlinkSync(file);
    });
    console.warn = tempConsoleWarn;
  });
});
