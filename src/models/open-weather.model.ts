import { Clouds } from './clouds.model';
import { Coordinates } from './coordinates.model';
import { OpenWeatherMain } from './open-weather-main.model';
import { OpenWeatherSys } from './open-weather-sys.model';
import { Weather } from './weather.model';
import { Wind } from './wind.model';

export interface OpenWeather {
  coord: Coordinates;
  weather: Weather;
  base: string;
  main: OpenWeatherMain;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: OpenWeatherSys;
  timezone: number;
  id: string;
  name: string;
  cod: number;
}
