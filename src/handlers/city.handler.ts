import { City } from '../models';

export class CityHandler {
  findCitiesByName(name: string): Promise<City[]> {
    const cities = require('../assets/current.city.list.min.json') as City[];

    return new Promise((resolve, reject) => {
      const found = cities.filter(
        (city) => city.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );

      /* eslint-disable-next-line */
      found.length > 0
        ? resolve(found)
        : reject({ error: `No cities found for ${name}` });
    });
  }

  findCityById(cityId: string): Promise<City> {
    const cities = require('../assets/current.city.list.min.json') as City[];

    return new Promise((resolve, reject) => {
      const found = cities.find((city) => city.id === parseInt(cityId, 10));

      /* eslint-disable-next-line */
      found ? resolve(found) : reject({ error: `No city found for ${cityId}` });
    });
  }
}
