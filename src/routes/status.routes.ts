import { Request, Response, Router } from 'express';
import { StatusHandler } from '../handlers';

export class StatusRoutes {

  private readonly router: Router;
  private statusHandler: StatusHandler;

  constructor() {
    this.router = Router();
    this.statusHandler = new StatusHandler();
    this.setupRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.get('/', (req: Request, res: Response) => this.getStatus(req, res));
    this.router.get('/status', (req: Request, res: Response) => this.getStatus(req, res));
    this.router.get('/api/status', (req: Request, res: Response) => this.getStatus(req, res));
  }

  private getStatus(req: Request, res: Response): void {
    this.statusHandler.checkIfOpenWeatherMapIsOnline()
      .then(status => {
        res.json(status);
      });
  }
}
