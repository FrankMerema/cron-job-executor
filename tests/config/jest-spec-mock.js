jest.mock('../../service.config.json', () => ({
  port: 1234,
  openWeatherMap: {
    secretKey: 'abc'
  }
}), { virtual: true });
