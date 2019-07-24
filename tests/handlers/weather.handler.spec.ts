import { WeatherService } from '../../src/api';
import { WeatherHandler } from '../../src/handlers';

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

const axiosResponse = {
  data: weatherResult,
  status: 200,
  statusText: 'good',
  headers: {},
  config: {}
};

const fetchWeatherForCityByCityNameMock = jest.fn().mockResolvedValue(axiosResponse);
const fetchWeatherForCityByIdMock = jest.fn().mockResolvedValue(axiosResponse);
const fetchWeatherForCityByCoordinatesMock = jest.fn().mockResolvedValue(axiosResponse);
const fetchWeatherForCityByZipMock = jest.fn().mockResolvedValue(axiosResponse);

WeatherService.fetchWeatherForCityByCityName = fetchWeatherForCityByCityNameMock;
WeatherService.fetchWeatherForCityById = fetchWeatherForCityByIdMock;
WeatherService.fetchWeatherForCityByCoordinates = fetchWeatherForCityByCoordinatesMock;
WeatherService.fetchWeatherForCityByZip = fetchWeatherForCityByZipMock;

describe('WeatherHandler', () => {
  const weatherHandler = new WeatherHandler();

  beforeEach(() => {
    fetchWeatherForCityByCityNameMock.mockClear();
    fetchWeatherForCityByIdMock.mockClear();
    fetchWeatherForCityByCoordinatesMock.mockClear();
    fetchWeatherForCityByZipMock.mockClear();
  });

  describe('get weather', () => {
    describe('successful', () => {
      test('via fetchWeatherForCityByCityName', async () => {
        await expect(weatherHandler.fetchWeatherForCityByCityName('weert')).resolves.toEqual(weatherResult);
        expect(fetchWeatherForCityByCityNameMock).toHaveBeenCalledWith('weert');
      });

      test('via fetchWeatherForCityByCityId', async () => {
        await expect(weatherHandler.fetchWeatherForCityById('2744911')).resolves.toEqual(weatherResult);
        expect(fetchWeatherForCityByIdMock).toHaveBeenCalledWith('2744911');
      });

      test('via fetchWeatherForCityByCoordinates', async () => {
        await expect(weatherHandler.fetchWeatherForCityByCoordinates('5.71', '51.25')).resolves.toEqual(weatherResult);
        expect(fetchWeatherForCityByCoordinatesMock).toHaveBeenCalledWith('5.71', '51.25');
      });

      test('via fetchWeatherForCityByZip', async () => {
        await expect(weatherHandler.fetchWeatherForCityByZip('6002', 'nl')).resolves.toEqual(weatherResult);
        expect(fetchWeatherForCityByZipMock).toHaveBeenCalledWith('6002', 'nl');
      });
    });

    describe('failing', () => {
      const error = { error: 'Not reachable...' };

      beforeEach(() => {
        fetchWeatherForCityByCityNameMock.mockRejectedValueOnce(error);
        fetchWeatherForCityByIdMock.mockRejectedValueOnce(error);
        fetchWeatherForCityByCoordinatesMock.mockRejectedValueOnce(error);
        fetchWeatherForCityByZipMock.mockRejectedValueOnce(error);
      });

      test('via fetchWeatherForCityByCityName', async () => {
        await expect(weatherHandler.fetchWeatherForCityByCityName('weert')).rejects.toEqual(error);
        expect(fetchWeatherForCityByCityNameMock).toHaveBeenCalledWith('weert');
      });

      test('via fetchWeatherForCityByCityId', async () => {
        await expect(weatherHandler.fetchWeatherForCityById('2744911')).rejects.toEqual(error);
        expect(fetchWeatherForCityByIdMock).toHaveBeenCalledWith('2744911');
      });

      test('via fetchWeatherForCityByCoordinates', async () => {
        await expect(weatherHandler.fetchWeatherForCityByCoordinates('5.71', '51.25')).rejects.toEqual(error);
        expect(fetchWeatherForCityByCoordinatesMock).toHaveBeenCalledWith('5.71', '51.25');
      });

      test('via fetchWeatherForCityByZip', async () => {
        await expect(weatherHandler.fetchWeatherForCityByZip('6002', 'nl')).rejects.toEqual(error);
        expect(fetchWeatherForCityByZipMock).toHaveBeenCalledWith('6002', 'nl');
      });
    });
  });
});
