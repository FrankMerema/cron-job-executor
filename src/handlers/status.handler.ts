import { isPortReachable } from '@frankmerema/is-port-reachable';

export class StatusHandler {

  checkIfOpenWeatherMapIsOnline(): Promise<{ openWeatherMap: string }> {
    return isPortReachable(80, { host: 'openweathermap.org' })
      .then(() => ({ openWeatherMap: 'ONLINE' }))
      .catch(err => {
        /* tslint:disable-next-line */
        console.error(err);
        return Promise.reject({ openWeatherMap: 'OFFLINE' });
      });
  }
}
