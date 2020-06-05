/* eslint-disable-next-line */
jest.mock('../../src/utils/config-reader.util');

/* eslint-disable-next-line */
const getConfigFile = require('../../src/utils/config-reader.util')
  .getConfigFile;

getConfigFile.mockImplementation(() => ({ serverPort: 1234 }));
