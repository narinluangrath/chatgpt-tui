import { LineRenderer } from "./line-renderer";
import { CodeLineRenderer } from "./code-line-renderer";
import { StandardRenderer } from "./standard-renderer";
import { MarkdownRenderer } from "./markdown-renderer";

export interface Renderer {
  injest(input: string): void;
  flush(): void;
}

export { LineRenderer, CodeLineRenderer, StandardRenderer, MarkdownRenderer };
