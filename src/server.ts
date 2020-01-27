/* eslint-disable */
import { Request } from 'express';
import { CityRoutes, StatusRoutes, WeatherRoutes } from './routes';
import { getConfigFile } from './utils/config-reader.util';

const express = require('express');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
/* eslint-enable */

export const start = (): void => {
  let port = 8080;

  const configFile = getConfigFile();

  if (configFile.serverPort) {
    port = parseInt(configFile.serverPort, 10);
  } else {
    /* eslint-disable-next-line */
    console.warn(
      `No \`serverPort\` property found, falling back to default ${port}`
    );
  }

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    new RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      onLimitReached: (req: Request): void => {
        /* eslint-disable-next-line */
        console.error(`Received to many requests from ${req.ip}`);
      }
    })
  );

  app.use('/', new StatusRoutes().getRouter());
  app.use('/api/city', new CityRoutes().getRouter());
  app.use('/api/weather', new WeatherRoutes().getRouter());

  return app.listen(port, () => {
    /* eslint-disable-next-line */
    console.log(
      `Express app started at ${new Date()} and listening on port ${port}!`
    );
  });
};
