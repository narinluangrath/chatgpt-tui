const fs = require("fs");
const {
  replacePlaceholdersWithFolderContents,
} = require("./replace-placeholders-with-folder-contents");

describe("replacePlaceholdersWithFolderContents", () => {
  const tempFiles = ["test3.txt", "test4.txt"];
  const tempConsoleWarn = console.warn;

  beforeAll(() => {
    // Create some test files
    fs.mkdirSync("testFolder");
    fs.writeFileSync("testFolder/test3.txt", "contents of test3 file");
    fs.writeFileSync("testFolder/test4.txt", "contents of test4 file");
    fs.mkdirSync("emptyFolder");
  });

  test("should replace placeholders with folder contents", () => {
    const input = "This folder contains $FOLDER(./testFolder)";
    ("This folder contains test3.txt: contents of test3 file, test4.txt: contents of test4 file files");
    expect(replacePlaceholdersWithFolderContents(input)[0])
      .toMatchInlineSnapshot(`
    "This folder contains 
    
    test3.txt
    
    contents of test3 file
    
    
    
    test4.txt
    
    contents of test4 file"
    `);
  });

  test("should handle input without placeholders", () => {
    const input = "This is a test without placeholders";
    expect(replacePlaceholdersWithFolderContents(input)[0]).toBe(input);
  });

  test("should ignore nonexistent directories and log a message", () => {
    console.warn = jest.fn();
    const input = "Here is a $FOLDER(nonexistent) folder that does not exist";
    expect(replacePlaceholdersWithFolderContents(input)[0]).toBe(input);
    expect(console.warn).toHaveBeenCalled();
  });

  test("should handle empty folders gracefully", () => {
    const input = "This has a $FOLDER(./emptyFolder) folder that is empty";
    const expectedOutput = "This has a  folder that is empty";
    expect(replacePlaceholdersWithFolderContents(input)[0]).toBe(
      expectedOutput
    );
  });

  afterAll(() => {
    // Clean up the test files
    tempFiles.forEach((file) => {
      fs.unlinkSync(`testFolder/${file}`);
    });
    fs.rmdirSync("testFolder");
    fs.rmdirSync("emptyFolder");
    console.warn = tempConsoleWarn;
  });
});
