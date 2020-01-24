import Path from 'path';

export interface Config {
  serverPort?: string;
  openWeatherMapKey?: string;
}

export const getConfigFile = (): Config => {
  const args = process.argv.slice(2);
  const configFileLocation = args.find(
    arg => arg.indexOf('--config') !== -1 || arg.indexOf('-c') !== -1
  );

  if (configFileLocation && configFileLocation.match(/.json/g)) {
    try {
      return require(Path.resolve(configFileLocation.split('=')[1]));
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        /* eslint-disable-next-line */
        console.warn(
          'Please provide a valid config file see README for the format'
        );
      } else {
        /* eslint-disable-next-line */
        console.warn(
          `No valid config file found for the --config="${Path.resolve(
            configFileLocation.split('=')[1]
          )}"`
        );
      }

      return {};
    }
  } else {
    /* eslint-disable-next-line */
    console.warn(
      'Please provide a valid json config file link via the `--config` or `-c` flag'
    );

    return {};
  }
};
