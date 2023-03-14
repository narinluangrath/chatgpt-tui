const { extractCodeBlocks } = require("./write-output-to-file");

describe("extractCodeBlocks", () => {
  it("should extract code blocks with languages and filenames", () => {
    const str = `
# Hello World

This is a code block:
\`\`\`js
console.log("This is a code block");
\`\`\`

This is another code block:
\`\`\`ts
console.log("This is another code block");
\`\`\`

This code block has a filename specified:
\`./src/index.js\`
\`\`\`js
console.log("This code block has a filename specified");
\`\`\`
    `;

    const expectedResult = [
      'console.log("This is a code block");',
      'console.log("This is another code block");',
      'console.log("This code block has a filename specified");',
    ];

    const result = extractCodeBlocks(str);

    expect(result).toEqual(expectedResult);
  });

  it("should extract code blocks without languages or filenames", () => {
    const str = `
# Hello World

This is a code block without a language specified:
\`\`\`
console.log("This is a code block without a language specified");
\`\`\`
    `;

    const expectedResult = [
      'console.log("This is a code block without a language specified");',
    ];

    const result = extractCodeBlocks(str);

    expect(result).toEqual(expectedResult);
  });

  it("should extract multiple code blocks", () => {
    const str = `
# Hello World

This is a code block:
\`\`\`js
console.log("This is a code block");
\`\`\`

This is another code block:
\`\`\`ts
console.log("This is another code block");
\`\`\`
    `;

    const expectedResult = [
      'console.log("This is a code block");',
      'console.log("This is another code block");',
    ];

    const result = extractCodeBlocks(str);

    expect(result).toEqual(expectedResult);
  });

  it("should not return code blocks if none are found", () => {
    const str = `
# Hello World

This document doesn't contain any code blocks.
    `;

    const expectedResult = [];

    const result = extractCodeBlocks(str);

    expect(result).toEqual(expectedResult);
  });
});
