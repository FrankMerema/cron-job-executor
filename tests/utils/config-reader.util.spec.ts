import { getConfigFile } from '../../src/utils/config-reader.util';

jest.mock('path');
jest.unmock('../../src/utils/config-reader.util');

describe('ConfigReaderUtil', () => {
  process.argv = ['node', 'filename', '--config="service.config.json"'];

  /* eslint-disable-next-line  @typescript-eslint/no-var-requires */
  const pathResolve = require('path').resolve;

  afterEach(() => {
    jest.resetModules();
  });

  test('correctly resolve and return the config file with argv --config', () => {
    const config = { serverPort: 1 };
    jest.mock('service.config.json', () => config, { virtual: true });
    pathResolve.mockImplementation(() => 'service.config.json');

    expect(getConfigFile()).toEqual(config);
  });

  test('correctly resolve and return the config file with argv -c', () => {
    process.argv = ['node', 'filename', '--c="service.config.json"'];
    const config = { serverPort: 1 };
    jest.mock('service.config.json', () => config, { virtual: true });
    pathResolve.mockImplementation(() => 'service.config.json');

    expect(getConfigFile()).toEqual(config);
  });

  describe('failing of', () => {
    test('reading the config file without a proper json format', () => {
      spyOn(global.console, 'warn');
      jest.mock(
        'service.config.json',
        () => {
          /* eslint-disable-next-line */
          throw { code: 'abc' };
        },
        { virtual: true }
      );
      pathResolve.mockImplementation(() => 'service.config.json');

      expect(getConfigFile()).toEqual({});
      /* eslint-disable-next-line */
      expect(console.warn).toHaveBeenCalledWith(
        'Please provide a valid config file see README for the format'
      );
    });

    test('finding the config file if a wrong location is provided', () => {
      spyOn(global.console, 'warn');
      jest.mock(
        'service.config.json',
        () => {
          /* eslint-disable-next-line */
          throw { code: 'MODULE_NOT_FOUND' };
        },
        { virtual: true }
      );
      pathResolve.mockImplementation(() => 'service.config.json');

      expect(getConfigFile()).toEqual({});
      /* eslint-disable-next-line */
      expect(console.warn).toHaveBeenCalledWith(
        'No valid config file found for the --config="service.config.json"'
      );
    });
  });

  test('with no config file url provided should return empty and log', () => {
    process.argv = [];
    spyOn(global.console, 'warn');

    expect(getConfigFile()).toEqual({});
    /* eslint-disable-next-line */
    expect(console.warn).toHaveBeenCalledWith(
      'Please provide a valid json config file link via the `--config` or `-c` flag'
    );
  });

  test('with a non json config file url provided should return empty and log', () => {
    process.argv = ['node', 'filename', '--config="service.config.yaml"'];
    spyOn(global.console, 'warn');

    expect(getConfigFile()).toEqual({});
    /* eslint-disable-next-line */
    expect(console.warn).toHaveBeenCalledWith(
      'Please provide a valid json config file link via the `--config` or `-c` flag'
    );
  });
});
