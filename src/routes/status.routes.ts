import { StatusHandler } from '@handlers';
import { Request, Response, Router } from 'express';

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
      }).catch(() => {
      res.status(404).json({ error: 'Something went wrong when checking statuses' });
    });
  }
}
