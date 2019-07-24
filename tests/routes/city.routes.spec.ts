import request from 'supertest';
import { start } from '../../src/server';

describe('CityRoutes', () => {

  let app: any;
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

  beforeAll(() => {
    app = start();
  });

  afterAll(() => {
    app.close();
  });

  describe('find city by name', () => {
    test('find 1 city for the name \'nederweert\'', async () => {
      const response = await request(app).get('/api/city/name/nederweert');

      expect(response.status).toEqual(200);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual(nederweert);
    });

    test('find a list of cities for the name \'weert\'', async () => {
      const response = await request(app).get('/api/city/name/weert');

      expect(response.status).toEqual(200);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.length).toEqual(2);
      expect(response.body[0]).toEqual(weert);
      expect(response.body[1]).toEqual(nederweert);
    });

    test('should return error message if no cities found', async () => {
      const response = await request(app).get('/api/city/name/asdfasdfd');

      expect(response.status).toEqual(404);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(JSON.parse(response.text)).toEqual({ error: 'No cities found for asdfasdfd' });
    });
  });

  describe('find city by id', () => {
    test('find \'nederweert\' for the id 2750467', async () => {
      const response = await request(app).get('/api/city/id/2750467');

      expect(response.status).toEqual(200);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body).toEqual(nederweert);
    });

    test('find \'weert\' for the id 2744911', async () => {
      const response = await request(app).get('/api/city/id/2744911');

      expect(response.status).toEqual(200);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body).toEqual(weert);
    });

    test('should return error message if no cities found', async () => {
      const response = await request(app).get('/api/city/id/99999999999999');

      expect(response.status).toEqual(404);
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(JSON.parse(response.text)).toEqual({ error: 'No city found for 99999999999999' });
    });
  });
});
