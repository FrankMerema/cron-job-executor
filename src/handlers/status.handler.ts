import { isPortReachable } from '@frankmerema/is-port-reachable';

export class StatusHandler {

  checkIfOpenWeatherMapIsOnline(): Promise<{ openWeatherMap: string }> {
    return isPortReachable(80, { host: 'openweathermap.org' })
      .then(() => {
        return { openWeatherMap: 'ONLINE' };
      }).catch(err => {
        console.log(err);
        return { openWeatherMap: 'OFFLINE' };
      });
  }
}
