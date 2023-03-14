const { LineRenderer } = require("./line-renderer");
const { CodeLineRenderer } = require("./code-line-renderer");
const { StandardRenderer } = require("./standard-renderer");
const { MarkdownRenderer } = require("./markdown-renderer");

export interface Renderer {
  injest(input: string): void;
  flush(): void;
}

module.exports = {
  LineRenderer,
  CodeLineRenderer,
  StandardRenderer,
  MarkdownRenderer,
};
