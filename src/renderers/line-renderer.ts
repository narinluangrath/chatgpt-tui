import { Renderer } from "./index";

/**
 * A class that renders text line by line as it is injested
 * Does NOT render the new line character
 *
 * @param code The initial text to render
 * @param render The function to render the code with
 */
class LineRenderer implements Renderer {
  private _unrendered: string;
  private _render: (output: string) => void;

  constructor({ text = "", render = (str) => console.log(str) } = {}) {
    this._render = render;
    this._unrendered = "";
    this.injest(text);
  }

  set render(render: (output: string) => void) {
    this._render = render;
  }

  injest(input: string) {
    this._unrendered += input;
    let newLineIndex = this._unrendered.indexOf("\n");
    while (newLineIndex !== -1) {
      const line = this._unrendered.slice(0, newLineIndex);
      this._render(line);
      this._unrendered = this._unrendered.slice(newLineIndex + 1);
      newLineIndex = this._unrendered.indexOf("\n");
    }
  }

  flush() {
    if (this._unrendered === "") return;
    this._render(this._unrendered);
    this._unrendered = "";
  }
}

export { LineRenderer };
