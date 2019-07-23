import { Request, Response, Router } from 'express';
import { WeatherHandler } from '../handlers';

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
      res.status(404).json(error);
    });
  }

  private getWeatherByCityId(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityById(req.params.id)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(404).json(error);
    });
  }

  private getWeatherByCoordinates(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityByCoordinates(req.params.lon, req.params.lat)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(404).json(error);
    });
  }

  private getWeatherByZip(req: Request, res: Response): void {
    this.weatherHandler.fetchWeatherForCityByZip(req.params.zip, req.params.country)
      .then(weather => {
        res.json(weather);
      }).catch(error => {
      res.status(404).json(error);
    });
  }
}
