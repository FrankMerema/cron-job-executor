import { WeatherService } from '@api';
import { OpenWeather } from '@models';

export class WeatherHandler {

  fetchWeatherForCityByCityName(cityName: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByCityName(cityName)
      .then(openWeather => openWeather.data);
  }

  fetchWeatherForCityById(cityId: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityById(cityId)
      .then(openWeather => openWeather.data);
  }

  fetchWeatherForCityByCoordinates(lon: string, lat: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByCoordinates(lon, lat)
      .then(openWeather => openWeather.data);
  }

  fetchWeatherForCityByZip(zip: string, countryAbbreviation: string): Promise<OpenWeather> {
    return WeatherService.fetchWeatherForCityByZip(zip, countryAbbreviation)
      .then(openWeather => openWeather.data);
  }
}
