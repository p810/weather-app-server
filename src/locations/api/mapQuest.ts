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
    Coordinates,
    RegionByCode,
} from '../entities/Location';

import { LocationApiClient } from './location';
import { filterByAll } from '../../util/filter';

export class MapQuestClient extends LocationApiClient {
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

const hasZipQualityCode = function hasZipQualityCode(location: GeocoderLocation) {
    return location.geocodeQuality === Quality.Zip;
}

const hasUsCountryCode = function hasUsCountryCode(location: GeocoderLocation) {
    return location.adminArea1 === 'US';
}

const hasRequiredParameters = function hasRequiredParameters(location: GeocoderLocation) {
    let required = [
        'adminArea1',
        'adminArea3',
        'adminArea5',
        'postalCode',
        'latLng',
    ];

    return required.every(prop => !! location[prop]);
}

const transformGeocoderLocation = function transformGeocoderLocation(location: GeocoderLocation) {
    const {
        postalCode,
        latLng: {lat, lng},
        adminArea5: city,
        adminArea3: state,
    } = location;

    return Location(city, RegionByCode(state), postalCode, Coordinates(lat, lng));
}
