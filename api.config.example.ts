import { Domains } from './src/routes';

export const config = {
    [Domains.Location]: {
        mapQuest: {
            url: "http://mapquestapi.com/geocoding/v1",
            options: {
                key: "abc123",
            },
        },
    },
    [Domains.Weather]: {},
}
