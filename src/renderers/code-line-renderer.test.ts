import { CodeLineRenderer } from "./code-line-renderer";
import javascriptTokens0 from "./test-data/javascript-tokens-0";
import javascriptTokens0Output from "./test-data/javascript-tokens-0-output";
import javascriptTokens1 from "./test-data/javascript-tokens-1";
import javascriptTokens1Output from "./test-data/javascript-tokens-1-output";

describe("CodeLineRenderer", () => {
  it("should correctly render javascript code", () => {
    const log0 = [];
    const renderer0 = new CodeLineRenderer({
      language: "js",
      render: (str) => log0.push(str),
    });
    javascriptTokens0.forEach((token) => {
      renderer0.injest(token);
    });
    renderer0.flush();
    expect(log0.join("\n")).toBe(javascriptTokens0Output);

    const log1 = [];
    const renderer1 = new CodeLineRenderer({
      language: "js",
      render: (str) => log1.push(str),
    });
    javascriptTokens1.forEach((token) => {
      renderer1.injest(token);
    });
    renderer1.flush();
    expect(log1.join("\n")).toBe(javascriptTokens1Output);
  });
});
