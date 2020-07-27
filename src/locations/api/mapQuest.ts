import {
    Location as GeocoderLocation,
    Quality,
    Response,
    getLocationsFromResponse,
    getPostalCodeConfidence,
    isExactMatch,
} from './MapQuest/address';

import {
    LocationModel,
    Location,
    getRegionByCode,
    Coordinates,
} from '../entities/Location';

import { HttpAdapter, ApiConfig } from '../../http';
import LocationApiClient from './location';
import { filterByAll } from '../../util/filter';

export default class MapQuestClient implements LocationApiClient {
    constructor(
        readonly config: ApiConfig,
        readonly adapter: HttpAdapter,
    ) {}

    async getLocationByZip(zip: string | number): Promise<LocationModel> {
        const url = this.config.getUrlFor('address', {
            key: this.config.options.key,
            location: `${zip},United States`
        });

        const payload = await this.adapter.request(url);

        return this.getLocationFromGeocoder(payload as Response);
    }

    async getLocationByCoordinates(lat: string | number, lng: string | number): Promise<LocationModel> {
        const url = this.config.getUrlFor('reverse', {
            key: this.config.options.key,
            location: `${lat},${lng}`
        });

        const payload = await this.adapter.request(url);

        return this.getLocationFromReverseGeocoder(payload as Response);
    }

    protected getLocationFromGeocoder(response: Response): Promise<LocationModel> {
        return new Promise((resolve, reject) => {
            let filter = filterByAll<GeocoderLocation>(
                hasRequiredParameters,
                hasZipQualityCode,
                hasUsCountryCode,
            );

            let locations = filter(...getLocationsFromResponse(response));

            locations.forEach(location => {
                let zipConfidence = getPostalCodeConfidence(location.geocodeQualityCode);

                if (isExactMatch(zipConfidence)) {
                    resolve(transformGeocoderLocation(location));
                }
            });

            reject('A suitable match could not be found for the given zip code');
        });
    }

    protected getLocationFromReverseGeocoder(response: Response): Promise<LocationModel> {
        return new Promise((resolve, reject) => {
            let filter = filterByAll<GeocoderLocation>(
                hasRequiredParameters,
                hasUsCountryCode,
            );

            let locations = filter(...getLocationsFromResponse(response));

            if (! locations.length) {
                reject('A suitable match could not be found for the given coordinates');
            }

            let location = locations.shift();

            resolve(transformGeocoderLocation(location));
        });
    }
}

const hasZipQualityCode = (location: GeocoderLocation) => location.geocodeQuality === Quality.Zip;

const hasUsCountryCode = (location: GeocoderLocation) => location.adminArea1 === 'US';

const hasRequiredParameters = (location: GeocoderLocation) =>
    !! location.adminArea1 &&
    !! location.adminArea3 &&
    !! location.adminArea5 &&
    !! location.postalCode &&
    !! location.latLng;

const transformGeocoderLocation = ({
    postalCode,
    latLng: {
        lat: lat,
        lng: lng,
    },
    adminArea5: city,
    adminArea3: state,
}: Partial<GeocoderLocation>): LocationModel => {
    return Location(
        city,
        getRegionByCode(state),
        postalCode,
        Coordinates(lat, lng)
    );
}
