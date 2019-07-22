import { CityLanguage } from './city-language.model';
import { CityStats } from './city-stats.model';
import { Coordinates } from './coordinates.model';
import { GeoName } from './geo-name.model';
import { WeatherStation } from './weather-station.model';

export interface City {
  id: number;
  coord: Coordinates;
  country: string;
  geoname: GeoName;
  langs: CityLanguage[];
  name: string;
  stat: CityStats;
  stations: WeatherStation[];
  zoom: number;
}
