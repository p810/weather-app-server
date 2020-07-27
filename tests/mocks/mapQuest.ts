import { Response } from '../../src/locations/api/MapQuest/address';
import { BaseApiConfig, ApiConfig } from '../../src/http';

export const successfulResponse: Response = {
    info: {
        statuscode: 0,
        messages: [],
    },
    results: [
        {
            locations: [
                {
                    street: '',
                    adminArea5: 'Birmingham',
                    adminArea4: 'Jefferson County',
                    adminArea3: 'AL',
                    adminArea1: 'US',
                    postalCode: '35222',
                    geocodeQualityCode: 'Z1XAA',
                    geocodeQuality: 'ZIP',
                    latLng: {
                        lat: 33.523657,
                        lng: -86.769112,
                    },
                },
            ],
        },
    ],
};

export const returnLocations = (...args) => {
    return Promise.resolve({
        json() {
            return Promise.resolve(successfulResponse);
        }
    });
}

export const errorResponse: Response = {
    info: {
        statuscode: 500,
        messages: [],
    },
    results: [],
}

const withError = (
    statuscode: number = 500,
    messages: string[] = [],
) => {
    return {
        info: {
            statuscode,
            messages,
        },
        results: []
    } as Response
}

export const config: ApiConfig = new BaseApiConfig('https://localhost', { key: 'abc123' });
