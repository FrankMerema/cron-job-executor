import { AxiosError } from 'axios';
import { Request, Response, Router } from 'express';
import { WeatherHandler } from '../handlers';
import { WeatherError } from '../models';

export class WeatherRoutes {

  private readonly router: Router;
  private weatherHandler: WeatherHandler;

  constructor() {
    this.router = Router();
    this.weatherHandler = new WeatherHandler();
    this.setupRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.get('/cityName/:name', (req: Request, res: Response) => this.getWeatherByCityName(req, res));
    this.router.get('/cityId/:id', (req: Request, res: Response) => this.getWeatherByCityId(req, res));
    this.router.get('/cityCoordinates/:lon/:lat', (req: Request, res: Response) => this.getWeatherByCoordinates(req, res));
    this.router.get('/cityZip/:zip/:country', (req: Request, res: Response) => this.getWeatherByZip(req, res));
  }

  private getWeatherByCityName(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityByCityName(req.params.name)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(error.response.status).json(this.handleError(error));
    });
  }

  private getWeatherByCityId(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityById(req.params.id)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(error.response.status).json(this.handleError(error));
    });
  }

  private getWeatherByCoordinates(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityByCoordinates(req.params.lon, req.params.lat)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(error.response.status).json(this.handleError(error));
    });
  }

  private getWeatherByZip(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityByZip(req.params.zip, req.params.country)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(error.response.status).json(this.handleError(error));
    });
  }

  private handleError(error: AxiosError): WeatherError {
    const message401 = 'Invalid API key! Did exceeded your limits || provided a correct `openWeatherMapKey` in your config?';

    return {
      code: error.response.status,
      statusText: error.response.statusText,
      message: error.response.status === 401 ?
        message401 : error.response.data.message
    };
  }
}
