/* tslint:disable */
import { Request, Response } from 'express';
import RateLimit = require('express-rate-limit');
import helmet = require('helmet');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('../service.config.json');

export function start() {
  const port = config.serverPort || 8080;

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    onLimitReached(req: Request): void {
      console.info(`Received to many requests from ${req.ip}`);
    }
  }));

  // app.use('/api/weather', new WeatherRoutes(weatherHandler).getRouter());

  app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  });

  app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  });

  app.listen(port, () => {
    console.log(`Express app started at ${new Date()} and listening on port ${port}!`);
  });
}
