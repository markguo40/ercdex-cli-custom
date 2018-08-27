import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import * as express from 'express';
import * as http from 'http';
import * as methodOverride from 'method-override';
import './controllers/allowance-controller';
import './controllers/order-controller';
import './controllers/wallet-controller';
import { RegisterRoutes } from './routes';

export interface IServerParams {
  port?: number;
  log?: boolean;
}

export const startServer = async (args: IServerParams) => {
  return new Promise((resolve, reject) => {
    try {
      const port = args.port || 8700;
      const hostIp = '127.0.0.1';
      const app = express();
      const server = http.createServer(app);
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(methodOverride());

      app.use('/swagger.json', (_req, res) => {
        res.sendFile(__dirname + '/swagger.json');
      });

      app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });

      RegisterRoutes(app);

      // It's important that this come after the main routes are registered
      app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        err = err || {};
        const status = err.status || 500;
        const body: any = {
          fields: err.fields || undefined,
          message: err.message || 'An error occurred during the request.',
          name: err.name,
          status
        };

        if (args.log && err.message) {
          console.error(err.message);
        }

        res.status(status).json(body);
        next();
      });

      app.get('/', (_req, res) => {
        res.sendStatus(200);
      });

      server.listen(port, hostIp, (err: Error) => {
        if (err) {
          return console.log(err);
        }
        console.log(chalk.green(`ERC dEX proxy server listening on ${port}.`));
        resolve();
      });

      process.on('unhandledRejection', err => {
        console.log(err);
      });
      process.on('uncaughtException', err => {
        console.log(err);
      });

      return server;
    } catch (err) {
      reject(err);
    }
  });
};
