import request from 'supertest';
import { start } from '../../src/server';

const weatherResult = {
  coord: {
    lon: 5.71,
    lat: 51.25
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 298.6,
    pressure: 1021,
    humidity: 50,
    temp_min: 296.15,
    temp_max: 300.93
  },
  visibility: 10000,
  wind: {
    speed: 2.1,
    deg: 140
  },
  clouds: {
    all: 0
  },
  dt: 1563867899,
  sys: {
    type: 1,
    id: 1527,
    message: 0.0084,
    country: 'NL',
    sunrise: 1563853700,
    sunset: 1563910715
  },
  timezone: 7200,
  id: 2744911,
  name: 'Weert',
  cod: 200
};

const fetchWeatherForCityByCityNameMock = jest.fn().mockResolvedValue(weatherResult);
const fetchWeatherForCityByIdMock = jest.fn().mockResolvedValue(weatherResult);
const fetchWeatherForCityByCoordinatesMock = jest.fn().mockResolvedValue(weatherResult);
const fetchWeatherForCityByZipMock = jest.fn().mockResolvedValue(weatherResult);

jest.mock('../../src/handlers/weather.handler', () => {
  return {
    WeatherHandler: jest.fn().mockImplementation(() => {
      return {
        fetchWeatherForCityByCityName: fetchWeatherForCityByCityNameMock,
        fetchWeatherForCityById: fetchWeatherForCityByIdMock,
        fetchWeatherForCityByCoordinates: fetchWeatherForCityByCoordinatesMock,
        fetchWeatherForCityByZip: fetchWeatherForCityByZipMock
      };
    })
  };
});

describe('WeatherRoutes', () => {

  let app: any;

  beforeAll(() => {
    app = start();
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(() => {
    fetchWeatherForCityByCityNameMock.mockClear();
    fetchWeatherForCityByIdMock.mockClear();
    fetchWeatherForCityByCoordinatesMock.mockClear();
    fetchWeatherForCityByZipMock.mockClear();
  });

  describe('fetch weather', () => {

    describe('sucessful', () => {

      test('via /cityName/:name endpoint', async () => {
        const response = await request(app).get('/api/weather/cityName/weert');

        expect(fetchWeatherForCityByCityNameMock).toHaveBeenCalledWith('weert');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(weatherResult);
      });

      test('via /cityId/:id endpoint', async () => {
        const response = await request(app).get('/api/weather/cityId/2744911');

        expect(fetchWeatherForCityByIdMock).toHaveBeenCalledWith('2744911');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(weatherResult);
      });

      test('via /cityCoordinates/:lon/:lat endpoint', async () => {
        const response = await request(app).get('/api/weather/cityCoordinates/5.70694/51.251671');

        expect(fetchWeatherForCityByCoordinatesMock).toHaveBeenCalledWith('5.70694', '51.251671');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(weatherResult);
      });

      test('via /cityZip/:zip/:country endpoint', async () => {
        const response = await request(app).get('/api/weather/cityZip/6002/nl');

        expect(fetchWeatherForCityByZipMock).toHaveBeenCalledWith('6002', 'nl');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(weatherResult);
      });
    });

    describe('failing', () => {
      const customRes = { error: 'Not reachable...' };

      beforeEach(() => {
        fetchWeatherForCityByCityNameMock.mockRejectedValueOnce(customRes);
        fetchWeatherForCityByIdMock.mockRejectedValueOnce(customRes);
        fetchWeatherForCityByCoordinatesMock.mockRejectedValueOnce(customRes);
        fetchWeatherForCityByZipMock.mockRejectedValueOnce(customRes);
      });

      test('via /cityName/:name endpoint', async () => {
        const response = await request(app).get('/api/weather/cityName/weert');

        expect(fetchWeatherForCityByCityNameMock).toHaveBeenCalledWith('weert');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual(customRes);
      });

      test('via /cityId/:id endpoint', async () => {
        const response = await request(app).get('/api/weather/cityId/2744911');

        expect(fetchWeatherForCityByIdMock).toHaveBeenCalledWith('2744911');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual(customRes);
      });

      test('via /cityCoordinates/:lon/:lat endpoint', async () => {
        const response = await request(app).get('/api/weather/cityCoordinates/5.70694/51.251671');

        expect(fetchWeatherForCityByCoordinatesMock).toHaveBeenCalledWith('5.70694', '51.251671');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual(customRes);
      });

      test('via /cityZip/:zip/:country endpoint', async () => {
        const response = await request(app).get('/api/weather/cityZip/6002/nl');

        expect(fetchWeatherForCityByZipMock).toHaveBeenCalledWith('6002', 'nl');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual(customRes);
      });
    });
  });
});
