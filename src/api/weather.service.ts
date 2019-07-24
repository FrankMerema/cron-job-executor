import axios, { AxiosPromise } from 'axios';
import { OpenWeather } from '../models';
import { getConfigFile } from '../utils/config-reader.util';

export class WeatherService {

  private static readonly key = getConfigFile().openWeatherMapKey || '';
  private static readonly WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

  static fetchWeatherForCityByCityName(city: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        q: city,
        appid: this.key
      }
    });
  }

  static fetchWeatherForCityById(cityId: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        id: cityId,
        appid: this.key
      }
    });
  }

  static fetchWeatherForCityByCoordinates(lon: string, lat: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        lon,
        lat,
        appid: this.key
      }
    });
  }

  static fetchWeatherForCityByZip(zip: string, countryAbbreviation: string): AxiosPromise<OpenWeather> {
    return axios.get<OpenWeather>(this.WEATHER_URL, {
      params: {
        zip: `${zip},${countryAbbreviation}`,
        appid: this.key
      }
    });
  }
}
