/**
 * This file is imported by `./src/index.ts` and provides API client objects for
 * the purpose of retrieving domain specific data from a third party API.
 * 
 * Multiple clients are made available to provide some redundancy, in case one
 * API happens to be unreachable or doesn't provide satisfactory results. These
 * clients are called in the order they're defined here.
 * 
 * Config data for the client classes is stored alongside this file in `api.config.json`.
 */

import { Domains, DomainToClients } from './src/routes';
import { MapQuestClient } from './src/locations/api/mapQuest';
import { FetchAdapter, BaseApiConfig } from './src/http';
import { config } from './api.config';

const fetchAdapter = new FetchAdapter();

export const clientMap: DomainToClients = {
    [Domains.Location]: [
        new MapQuestClient(
            fetchAdapter,
            BaseApiConfig.fromJson(config.location.mapQuest)
        ),
    ],
    [Domains.Weather]: [],
}
