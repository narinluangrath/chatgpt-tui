type Config = {
  debug: boolean;
};

let config: Config = {
  debug: false,
};

function getConfig() {
  return config;
}

function setConfig(newConfig: Partial<Config>) {
  config = { ...config, ...newConfig };
}

export { getConfig, setConfig };
