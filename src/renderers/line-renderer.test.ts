import { LineRenderer } from "./line-renderer";

describe("LineRenderer", () => {
  let mockedRender;

  beforeEach(() => {
    mockedRender = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render text line by line", () => {
    const text = "console.log('Hello');\nconsole.log('World');\n";
    const renderer = new LineRenderer({ text, render: mockedRender });
    renderer.injest("console.log('Goodbye');\n");
    expect(mockedRender.mock.calls.length).toBe(3);
    expect(mockedRender.mock.calls[0][0]).toBe("console.log('Hello');");
    expect(mockedRender.mock.calls[1][0]).toBe("console.log('World');");
    expect(mockedRender.mock.calls[2][0]).toBe("console.log('Goodbye');");
  });

  it("should handle incomplete lines of text", () => {
    const text = "console.log('Hello Wor";
    const renderer = new LineRenderer({ text, render: mockedRender });
    renderer.injest("ld');\n");
    expect(mockedRender.mock.calls.length).toBe(1);
    expect(mockedRender.mock.calls[0][0]).toBe("console.log('Hello World');");
  });

  it("should handle no lines of text", () => {
    const renderer = new LineRenderer({ render: mockedRender });
    renderer.injest("console.log('Hello Wo");
    expect(mockedRender.mock.calls.length).toBe(0);
  });
});
