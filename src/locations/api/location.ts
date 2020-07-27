import { ApiClient } from '../../http';
import { LocationModel } from '../entities/location';

export default interface LocationApiClient extends ApiClient {
    getLocationByZip(zip: string | number): Promise<LocationModel>;

    getLocationByCoordinates(lat:  string | number, lng: string | number): Promise<LocationModel>;
}
