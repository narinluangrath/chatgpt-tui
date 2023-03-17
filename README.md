# ChatGPT-TUI

A terminal user interface for ChatGPT.

## TODO

- [ ] Inject `#!/usr/bin/env node` into bin
- [ ] Fix markdown parser test/bug
- [ ] Support exporting multiple code blocks
- [ ] Export as npm package
- [ ] Add documentation to README
- [ ] Add CLI options
  - [ ] `--help`
  - [ ] `--verbose`
  - [ ] `--log-dir`
  - [ ] `--system-msg`
  - [ ] `--user-msg`
- [ ] Use type=number for code block prompt
- [ ] Debug weird line erasing issue on long message
- [ ] Add a default option to file output

for file in ./src/parsers/\*; do
yarn dev --user-msg "refactor this code to use es6 modules $file \n\n \$FILE($file)"
done
