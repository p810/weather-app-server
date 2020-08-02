import express from 'express';
import { ResponderFactory, Domains } from './routes';
import { ConsoleLogger, StackLogger } from './util/log';
import { clientMap } from '../clients.config';
import { zipController } from './locations/api/location';

global.fetch = require('node-fetch');

const app = express();

const logger = new StackLogger(
    new ConsoleLogger(),
);

const locationCtrl = new ResponderFactory(clientMap[Domains.Location], logger);
const weatherCtrl = new ResponderFactory(clientMap[Domains.Weather], logger);

app.get('/location/byZip/:zip((\\d+)(?:-\\d+)?)', locationCtrl.getResponder(zipController));

app.listen(9933, () => logger.info('API gateway listening on port 9933'));
