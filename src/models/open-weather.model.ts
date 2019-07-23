import { Clouds, Coordinates, OpenWeatherMain, OpenWeatherSys, Weather, Wind } from '@models';

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
