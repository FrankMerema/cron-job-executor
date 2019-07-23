import request from 'supertest';
import { start } from '../../src/server';

const res = { openWeatherMap: 'ONLINE' };
const checkWeatherOnlineFnMock = jest.fn().mockResolvedValue(res);

jest.mock('../../src/handlers/status.handler', () => {
  return {
    StatusHandler: jest.fn().mockImplementation(() => {
      return { checkIfOpenWeatherMapIsOnline: checkWeatherOnlineFnMock };
    })
  };
});

describe('StatusRoutes', () => {

  let app: any;

  beforeAll(() => {
    app = start();
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(() => {
    checkWeatherOnlineFnMock.mockClear();
  });

  describe('fetch status', () => {
    test('via / endpoint', async () => {
      const response = await request(app).get('/');

      expect(checkWeatherOnlineFnMock).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(res);
    });

    test('via /status endpoint', async () => {
      const response = await request(app).get('/status');

      expect(checkWeatherOnlineFnMock).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(res);
    });

    test('via /api/status endpoint', async () => {
      const response = await request(app).get('/api/status');

      expect(checkWeatherOnlineFnMock).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(res);
    });

    test('is offline via /', async () => {
      const customRes = { openWeatherMap: 'OFFLINE' };
      checkWeatherOnlineFnMock.mockRejectedValueOnce(customRes);

      const response = await request(app).get('/');

      expect(checkWeatherOnlineFnMock).toHaveBeenCalled();
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(customRes);
    });
  });
});
