const fs = require("fs");
const prompts = require("prompts");

const GPT_FOLDER_PATH = `${process.env.HOME}/.gpt`;
const CREDENTIALS_FILE_PATH = `${GPT_FOLDER_PATH}/credentials`;

function validateApiKey(apiKey) {
  if (!apiKey.startsWith("sk-")) {
    return `API key must start with 'sk-'`;
  }

  if (apiKey.length !== 51) {
    return `API key must be exactly 51 characters long`;
  }

  return true;
}

async function getCredentials() {
  // Make sure ~/.gpt folder exists
  if (!fs.existsSync(GPT_FOLDER_PATH)) {
    fs.mkdirSync(GPT_FOLDER_PATH);
  }

  // Check if ~/.gpt/credentials file exists
  if (!fs.existsSync(CREDENTIALS_FILE_PATH)) {
    const response = await prompts({
      type: "password",
      name: "apiKey",
      message: "Enter your API key:",
      validate: validateApiKey,
    });

    // Save API key to ~/.gpt/credentials file
    fs.writeFileSync(CREDENTIALS_FILE_PATH, response.apiKey);
    return response.apiKey;
  } else {
    // Load API key from ~/.gpt/credentials file
    return fs.readFileSync(CREDENTIALS_FILE_PATH, { encoding: "utf8" });
  }
}

module.exports = {
  validateApiKey,
  getCredentials,
};
