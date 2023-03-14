const { Renderer } = require("./index");

/**
 * A class that renders text immediately after its injested
 *
 * @param code The initial text to render
 * @param render The function to render the code with
 */
// @ts-expect-error
class StandardRenderer implements Renderer {
  private _render: (output: string) => void;

  constructor({ text = "", render = (str) => process.stdout.write(str) } = {}) {
    this._render = render;
    render(text);
  }

  injest(input: string) {
    this._render(input);
  }

  flush() {
    // Nothing to do
  }
}

module.exports = { StandardRenderer };
