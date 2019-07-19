import { OpenWeather } from '@models';
import axios, { AxiosPromise } from 'axios';

const config = require('../../service.config.json');

export class WeatherService {

  private static readonly WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

  static fetchWeatherForCityByCityName(city: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        q: city,
        appid: config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityById(cityId: number): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        id: cityId,
        appid: config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityByCoordinates(lon: number, lat: number): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        lon: lon,
        lat: lat,
        appid: config.openWeatherMap.secretKey
      }
    });
  }

  static fetchWeatherForCityByZip(zip: string, countryAbbreviation: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        zip: `${zip},${countryAbbreviation}`,
        appid: config.openWeatherMap.secretKey
      }
    });
  }
}


