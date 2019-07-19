import { WeatherService } from '@api';
import { OpenWeather } from '@models';

export class WeatherHandler {

  fetchWeatherForCityByCityName(cityName: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByCityName(cityName)
      .then(openWeather => {
        return openWeather.data;
      }).catch(err => {
        return err;
      });
  }

  fetchWeatherForCityById(cityId: number): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityById(cityId)
      .then(openWeather => {
        return openWeather.data;
      }).catch(err => {
        return err;
      });
  }

  fetchWeatherForCityByCoordinates(lon: number, lat: number): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByCoordinates(lon, lat)
      .then(openWeather => {
        return openWeather.data;
      }).catch(err => {
        return err;
      });
  }

  fetchWeatherForCityByZip(zip: string, countryAbbreviation: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByZip(zip, countryAbbreviation)
      .then(openWeather => {
        return openWeather.data;
      }).catch(err => {
        return err;
      });
  }
}
