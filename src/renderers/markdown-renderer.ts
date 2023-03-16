import { Renderer } from "./index";
import { CodeLineRenderer } from "./code-line-renderer";
import { StandardRenderer } from "./standard-renderer";

const START_OF_CODE_BLOCK = "\n```";
const END_OF_CODE_BLOCK = "```\n";

class MarkdownRenderer implements Renderer {
  private _unrendered: string;
  private _codeLineRenderer: CodeLineRenderer;
  private _standardRenderer: StandardRenderer;
  private _inCodeBlock: boolean;
  private _inLanguage: boolean;

  constructor({
    text = "",
    render = (str: string) => void process.stdout.write(str),
  } = {}) {
    this._codeLineRenderer = new CodeLineRenderer({
      text,
      render: (str: string) => render(`${str}\n`),
    });
    this._standardRenderer = new StandardRenderer({ text, render });
    this._inCodeBlock = false;
    this._inLanguage = false;
    this._unrendered = "";
    this.injest(text);
  }

  flush() {
    if (this._unrendered) {
      if (this._inCodeBlock) {
        this._codeLineRenderer.injest(this._unrendered);
      } else {
        this._standardRenderer.injest(this._unrendered);
      }
      this._unrendered = "";
    }
    this._codeLineRenderer.flush();
    this._standardRenderer.flush();
  }

  injest(input: string) {
    if (!input) return;
    this._unrendered += input;

    if (this._inLanguage) {
      const newLineIndex = this._unrendered.indexOf("\n");
      if (newLineIndex !== -1) {
        // Phew, we have found the end of the language
        const language = this._unrendered.slice(0, newLineIndex);
        this._codeLineRenderer.language = language;
        this._standardRenderer.injest(language);
        this._inLanguage = false;
        // The stuff after the language is the code
        const code = this._unrendered.slice(newLineIndex);
        this._codeLineRenderer.injest(code);
        this._unrendered = "";
        this._inCodeBlock = true;
      } else {
        // We are still in the language, and not at the end yet.
        // Need to collect more input
      }
      return;
    }

    if (this._inCodeBlock) {
      // We are in a code block, so we need to find the end of the code block
      const codeBlockEndIndex = this._unrendered.indexOf(END_OF_CODE_BLOCK);
      if (codeBlockEndIndex !== -1) {
        // We have found the end of the code block
        const code = this._unrendered.slice(0, codeBlockEndIndex);
        this._codeLineRenderer.injest(code);
        this._standardRenderer.injest(END_OF_CODE_BLOCK);
        this._unrendered = this._unrendered.slice(
          codeBlockEndIndex + END_OF_CODE_BLOCK.length
        );
        this._inCodeBlock = false;
      } else {
        // Though we haven't found the END_OF_CODE_BLOCK sequence, we could have partially found it
        if (this._unrendered.endsWith("`")) {
          // Don't injest this yet. It could be part of the END_OF_CODE_BLOCK sequence
          // Collect more text...
          return;
        } else {
          // We have not found the END_OF_CODE_BLOCK sequence and we are not in the middle of it either
          // Should be safe to injest the following as code
          this._codeLineRenderer.injest(this._unrendered);
          this._unrendered = "";
        }
      }
      return;
    }

    // We are not in a code block, we are free to keep injesting until we hit one
    const codeBlockIndex = this._unrendered.indexOf(START_OF_CODE_BLOCK);
    if (codeBlockIndex !== -1) {
      // We have found the start of a code block
      const before = this._unrendered.slice(0, codeBlockIndex);
      // This before stuff is definitely not code!
      this._standardRenderer.injest(before);
      this._standardRenderer.injest(START_OF_CODE_BLOCK);
      const after = this._unrendered.slice(
        codeBlockIndex + START_OF_CODE_BLOCK.length
      );
      // This after stuff is the stuff after the code block!
      // It could be a new line, or it could be the start of a language
      if (after.startsWith("\n")) {
        // So basically, we saw the sequence ```\n
        // so there is no need to check for a language
        // because that looks like ```someLanguage
        this._inCodeBlock = true;
        this._codeLineRenderer.injest(after);
        // We injested the whole thing, so we are done
        this._unrendered = "";
      } else {
        // We saw the sequence ```(NOT A NEWLINE)
        // the after stuff is part (potentially all, of the new language)
        this._unrendered = after;
        this._inLanguage = true;
      }
    } else if (this._unrendered.endsWith("\n")) {
      // This _could_ be the start of a code blck, but we don't know yet
      // We need to collect more input
      return;
    } else {
      // We are not entering or exiting a code block, and we are not in a language.
      // Render everything like normal
      this._standardRenderer.injest(this._unrendered);
      this._unrendered = "";
    }
  }
}

export { MarkdownRenderer };
