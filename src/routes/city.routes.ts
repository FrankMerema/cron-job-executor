import { Request, Response, Router } from 'express';
import { CityHandler } from '../handlers';

export class CityRoutes {
  private readonly router: Router;
  private cityHandler: CityHandler;

  constructor() {
    this.router = Router();
    this.cityHandler = new CityHandler();
    this.setupRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.get('/name/:name', (req: Request, res: Response) =>
      this.getCityByCriteria(req, res)
    );
    this.router.get('/id/:id', (req: Request, res: Response) =>
      this.getCityById(req, res)
    );
  }

  private getCityByCriteria(req: Request, res: Response): void {
    this.cityHandler
      .findCitiesByName(req.params.name)
      .then(cities => {
        res.json(cities);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }

  private getCityById(req: Request, res: Response): void {
    this.cityHandler
      .findCityById(req.params.id)
      .then(city => {
        res.json(city);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
}
