import { isPortReachable } from '@frankmerema/is-port-reachable';

export class StatusHandler {
  checkIfOpenWeatherMapIsOnline(): Promise<{ openWeatherMap: string }> {
    return isPortReachable(80, { host: 'api.openweathermap.org' })
      .then(() => ({ openWeatherMap: 'ONLINE' }))
      .catch(err => {
        /* eslint-disable-next-line */
        console.error(err);
        return { openWeatherMap: 'OFFLINE' };
      });
  }
}
