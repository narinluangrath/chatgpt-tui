const { MarkdownRenderer } = require("./markdown-renderer");
const markdownTokens = require("./test-data/markdown-tokens");
const markdownTokensOutput = require("./test-data/markdown-tokens-output");
const markdownTokens1 = require("./test-data/markdown-tokens-1");

describe("MarkdownRenderer", () => {
  it("should correctly render markdown code", () => {
    const log = [];
    const renderer = new MarkdownRenderer({ render: (str) => log.push(str) });
    markdownTokens.forEach((token) => {
      renderer.injest(token);
    });
    renderer.flush();
    expect(log.join("")).toBe(markdownTokensOutput);
  });

  it("should correctly render markdown code that contains markdown code", () => {
    const log = [];
    const renderer = new MarkdownRenderer({ render: (str) => log.push(str) });
    markdownTokens1.forEach((token) => {
      renderer.injest(token);
    });
    renderer.flush();
    expect(log.join("")).toMatchInlineSnapshot(`
      "Here is some stupid code that contains more stupid code:

      \`\`\`javascript
      const foo = '\`\`\`javascript\\nconsole.log("foo");\\n\`\`\`';
      \`\`\`
      "
    `);
  });
});
