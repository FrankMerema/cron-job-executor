import { WeatherService } from '../../src/api';

jest.mock('axios');

describe('WeatherService', () => {
  /* eslint-disable-next-line */
  const axios = require('axios');

  const weatherResult = {
    coord: {
      lon: 5.71,
      lat: 51.25
    },
    weather: {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    },
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
    id: '2744911',
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

  describe('fire a request to openweathermap', () => {
    test('for a city by name', async () => {
      axios.get.mockResolvedValue(axiosResponse);

      await expect(
        WeatherService.fetchWeatherForCityByCityName('weert')
      ).resolves.toEqual(axiosResponse);
    });

    test('for a city by id', async () => {
      axios.get.mockResolvedValue(axiosResponse);

      await expect(
        WeatherService.fetchWeatherForCityById('123456')
      ).resolves.toEqual(axiosResponse);
    });

    test('for a city by coordinates', async () => {
      axios.get.mockResolvedValue(axiosResponse);

      await expect(
        WeatherService.fetchWeatherForCityByCoordinates('5.1', '12.5')
      ).resolves.toEqual(axiosResponse);
    });

    test('for a city by zip', async () => {
      axios.get.mockResolvedValue(axiosResponse);

      await expect(
        WeatherService.fetchWeatherForCityByZip('1234', 'nl')
      ).resolves.toEqual(axiosResponse);
    });
  });
});
