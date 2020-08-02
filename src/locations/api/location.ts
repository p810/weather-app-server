import {
    ApiClient,
    HttpAdapter,
    ApiConfig,
    ApiResult,
    ApiResultObject,
} from '../../http';
import { LocationModel } from '../entities/location';
import { Request } from 'express';

export abstract class LocationApiClient implements ApiClient {
    constructor(
        readonly adapter: HttpAdapter,
        readonly config?: ApiConfig,
    ) {}

    abstract getLocationByZip(zip: string | number): Promise<LocationModel>;

    abstract getLocationByCoordinates(lat:  string | number, lng: string | number): Promise<LocationModel>;
}

export const zipController = function handleZipRequest(
    client: LocationApiClient,
    req: Request,
): Promise<ApiResultObject> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await client.getLocationByZip(req.params.zip);

            resolve(ApiResult(response));
        } catch (e) {
            reject(e);
        }
    });
}

export const coordinateController = function handleCoordinateRequest(
    client: LocationApiClient,
    req: Request,
): Promise<ApiResultObject> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await client.getLocationByZip(req.params.zip);

            resolve(ApiResult(response));
        } catch (e) {
            reject(e);
        }
    });
}
