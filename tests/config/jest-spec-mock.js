/* eslint-disable-next-line */
jest.mock('../../src/utils/config-reader.util');

/* eslint-disable-next-line */
const getConfigFile = require('../../src/utils/config-reader.util')
  .getConfigFile;

getConfigFile.mockImplementation(() => ({ serverPort: 1234 }));

/* eslint-disable */
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'info').mockImplementation(() => {});
/* eslint-enable */
