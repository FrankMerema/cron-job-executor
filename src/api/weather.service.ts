import { OpenWeather } from '@models';
import axios, { AxiosPromise } from 'axios';

export class WeatherService {

  private static readonly config = require('../../service.config.json');
  private static readonly WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

  static fetchWeatherForCityByCityName(city: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        q: city,
        appid: this.config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityById(cityId: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        id: cityId,
        appid: this.config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityByCoordinates(lon: string, lat: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        lon,
        lat,
        appid: this.config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityByZip(zip: string, countryAbbreviation: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        zip: `${zip},${countryAbbreviation}`,
        appid: this.config.openWeatherMap.secretKey
      }
    });
  }
}
