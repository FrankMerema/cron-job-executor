import { AxiosError } from 'axios';
import { Request, Response, Router } from 'express';
import { WeatherHandler } from '../handlers';
import { WeatherError } from '../models';

interface WeatherRequest extends Request {
  params: {
    id?: string;
    name?: string;
    lon?: string;
    lat?: string;
    zip?: string;
    country?: string;
  };
}

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
    this.router.get('/city/name/:name', (req: WeatherRequest, res: Response) =>
      this.getWeatherByCityName(req, res)
    );
    this.router.get('/city/id/:id', (req: WeatherRequest, res: Response) =>
      this.getWeatherByCityId(req, res)
    );
    this.router.get(
      '/city/coordinates/:lon/:lat',
      (req: WeatherRequest, res: Response) =>
        this.getWeatherByCoordinates(req, res)
    );
    this.router.get(
      '/city/zip/:zip/:country',
      (req: WeatherRequest, res: Response) => this.getWeatherByZip(req, res)
    );
  }

  private getWeatherByCityName(req: WeatherRequest, res: Response): void {
    this.weatherHandler
      .fetchWeatherForCityByCityName(req.params.name)
      .then((weather) => {
        res.json(weather);
      })
      .catch((error) => {
        res.status(error.response.status).json(this.handleError(error));
      });
  }

  private getWeatherByCityId(req: WeatherRequest, res: Response): void {
    this.weatherHandler
      .fetchWeatherForCityById(req.params.id)
      .then((weather) => {
        res.json(weather);
      })
      .catch((error) => {
        res.status(error.response.status).json(this.handleError(error));
      });
  }

  private getWeatherByCoordinates(req: WeatherRequest, res: Response): void {
    this.weatherHandler
      .fetchWeatherForCityByCoordinates(req.params.lon, req.params.lat)
      .then((weather) => {
        res.json(weather);
      })
      .catch((error) => {
        res.status(error.response.status).json(this.handleError(error));
      });
  }

  private getWeatherByZip(req: WeatherRequest, res: Response): void {
    this.weatherHandler
      .fetchWeatherForCityByZip(req.params.zip, req.params.country)
      .then((weather) => {
        res.json(weather);
      })
      .catch((error) => {
        res.status(error.response.status).json(this.handleError(error));
      });
  }

  private handleError(error: AxiosError): WeatherError {
    const message401 =
      'Invalid API key! Did exceeded your limits || provided a correct `openWeatherMapKey` in your config?';

    return {
      code: error.response.status,
      statusText: error.response.statusText,
      message:
        error.response.status === 401 ? message401 : error.response.data.message
    };
  }
}
