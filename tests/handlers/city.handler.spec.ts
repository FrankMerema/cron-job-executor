import { CityHandler } from '../../src/handlers';

describe('CityHandler', () => {
  const cityHandler = new CityHandler();

  const weert = {
    id: 2744911,
    coord: {
      lon: 5.70694,
      lat: 51.251671
    },
    country: 'NL',
    geoname: {
      cl: 'P',
      code: 'PPL',
      parent: 2744910
    },
    langs: [
      {
        de: 'Weert'
      },
      {
        en: 'Weert'
      },
      {
        fr: 'Weert'
      },
      {
        id: 'Weert'
      },
      {
        it: 'Weert'
      },
      {
        li: 'Wieërt'
      },
      {
        link: 'http://en.wikipedia.org/wiki/Weert'
      },
      {
        nl: 'Weert'
      },
      {
        ro: 'Weert'
      },
      {
        ru: 'Верт'
      },
      {
        sv: 'Weert'
      }
    ],
    name: 'Weert',
    stat: {
      level: 1,
      population: 48662
    },
    stations: [
      {
        id: 4841,
        dist: 34,
        kf: 1
      },
      {
        id: 5208,
        dist: 32,
        kf: 1
      },
      {
        id: 5219,
        dist: 45,
        kf: 1
      },
      {
        id: 8903,
        dist: 35,
        kf: 1
      },
      {
        id: 27709,
        dist: 44,
        kf: 1
      },
      {
        id: 28960,
        dist: 26,
        kf: 1
      },
      {
        id: 29086,
        dist: 26,
        kf: 1
      },
      {
        id: 29663,
        dist: 22,
        kf: 1
      },
      {
        id: 30081,
        dist: 21,
        kf: 1
      },
      {
        id: 30779,
        dist: 48,
        kf: 1
      },
      {
        id: 30900,
        dist: 20,
        kf: 1
      },
      {
        id: 31072,
        dist: 47,
        kf: 1
      },
      {
        id: 31254,
        dist: 9,
        kf: 1
      },
      {
        id: 31423,
        dist: 16,
        kf: 1
      },
      {
        id: 33795,
        dist: 33,
        kf: 1
      },
      {
        id: 34989,
        dist: 17,
        kf: 1
      },
      {
        id: 35437,
        dist: 43,
        kf: 1
      },
      {
        id: 35469,
        dist: 46,
        kf: 1
      }
    ],
    zoom: 10
  };
  const nederweert = {
    id: 2750467,
    coord: {
      lon: 5.74861,
      lat: 51.285831
    },
    country: 'NL',
    geoname: {
      cl: 'P',
      code: 'PPL',
      parent: 2750466
    },
    langs: [
      {
        de: 'Nederweert'
      },
      {
        en: 'Nederweert'
      },
      {
        fr: 'Nederweert'
      },
      {
        id: 'Nederweert'
      },
      {
        it: 'Nederweert'
      },
      {
        li: 'Ni-jwieërt'
      },
      {
        link: 'http://en.wikipedia.org/wiki/Nederweert'
      },
      {
        nl: 'Nederweert'
      },
      {
        sv: 'Nederweert'
      }
    ],
    name: 'Nederweert',
    stat: {
      level: 1,
      population: 16095
    },
    stations: [
      {
        id: 4841,
        dist: 38,
        kf: 1
      },
      {
        id: 4911,
        dist: 44,
        kf: 1
      },
      {
        id: 5208,
        dist: 32,
        kf: 1
      },
      {
        id: 5219,
        dist: 41,
        kf: 1
      },
      {
        id: 8903,
        dist: 38,
        kf: 1
      },
      {
        id: 27709,
        dist: 40,
        kf: 1
      },
      {
        id: 28960,
        dist: 23,
        kf: 1
      },
      {
        id: 29086,
        dist: 23,
        kf: 1
      },
      {
        id: 29663,
        dist: 23,
        kf: 1
      },
      {
        id: 30081,
        dist: 22,
        kf: 1
      },
      {
        id: 30900,
        dist: 18,
        kf: 1
      },
      {
        id: 31072,
        dist: 43,
        kf: 1
      },
      {
        id: 31254,
        dist: 12,
        kf: 1
      },
      {
        id: 31423,
        dist: 12,
        kf: 1
      },
      {
        id: 33795,
        dist: 34,
        kf: 1
      },
      {
        id: 34989,
        dist: 17,
        kf: 1
      },
      {
        id: 35469,
        dist: 43,
        kf: 1
      }
    ],
    zoom: 12
  };

  test('find 2 cities by name', async () => {
    await expect(cityHandler.findCitiesByName('weert')).resolves.toEqual([
      weert,
      nederweert
    ]);
  });

  test('find no cities by name', async () => {
    await expect(cityHandler.findCitiesByName('ahjsdfkadhsf')).rejects.toEqual({
      error: 'No cities found for ahjsdfkadhsf'
    });
  });

  test('find nederweert by id', async () => {
    await expect(cityHandler.findCityById('2750467')).resolves.toEqual(
      nederweert
    );
  });

  test('find no city for id 999999', async () => {
    await expect(cityHandler.findCityById('999999')).rejects.toEqual({
      error: 'No city found for 999999'
    });
  });
});
