import { StatusHandler } from '@handlers';

jest.mock('@frankmerema/is-port-reachable');

describe('StatusHandler', () => {

  const isPortReachable = require('@frankmerema/is-port-reachable').isPortReachable;
  const statusHandler = new StatusHandler();

  let promise: Promise<boolean | Error>;

  beforeEach(() => {
    promise = null;
    isPortReachable.mockImplementation(() => promise);
  });

  test('check that the services are online', async () => {
    promise = Promise.resolve(true);

    await expect(statusHandler.checkIfOpenWeatherMapIsOnline()).resolves.toEqual({ openWeatherMap: 'ONLINE' });
    expect(isPortReachable).toHaveBeenCalledWith(80, { host: 'openweathermap.org' });
  });

  test('check that the services are offline', async () => {
    promise = Promise.reject('Just because...');

    await expect(statusHandler.checkIfOpenWeatherMapIsOnline()).rejects.toEqual({ openWeatherMap: 'OFFLINE' });
    expect(isPortReachable).toHaveBeenCalledWith(80, { host: 'openweathermap.org' });
  });
});
