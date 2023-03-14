const { LineRenderer } = require("./line-renderer");
const { Renderer } = require("./index");

const highlight = require("cli-highlight").highlight;

function isOnlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

// @ts-expect-error
class CodeLineRenderer implements Renderer {
  private _render: (output: string) => void;
  // @ts-expect-error
  private _lineRenderer: LineRenderer;

  constructor({
    text = "",
    language = "",
    render = (str) => console.log(str),
  } = {}) {
    this._lineRenderer = new LineRenderer({
      text,
      render: (line: string) => render(highlight(line, { language })),
    });
    this._render = render;
  }

  set language(language: string) {
    if (!isOnlyLetters(language)) {
      console.error("Language must be only letters, got", language);
      language = undefined;
    }

    this._lineRenderer = new LineRenderer({
      render: (line: string) => this._render(highlight(line, { language })),
    });
  }

  injest(input: string) {
    this._lineRenderer.injest(input);
  }

  flush() {
    this._lineRenderer.flush();
  }
}

module.exports = { CodeLineRenderer };
