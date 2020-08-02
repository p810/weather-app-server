import { codeToState } from './states';

export const Region = function getRegion(name: string, code: string) {
    return {
        name,
        code,
    }
}

export const RegionByCode = function getRegionByCode(code: string) {
    return Region(codeToState[code], code);
}

export interface RegionModel extends ReturnType<typeof Region> {}

export const Location = function getLocationModel(
    city: string,
    state: RegionModel,
    zip: string | number,
    coordinates: CoordinatesModel
) {
    return {
        city,
        state,
        zip,
        coordinates,
    }
}

export interface LocationModel extends ReturnType<typeof Location> {}

export const Coordinates = function getCoordinates(latitude: number | string, longitude: number | string) {
    return {
        latitude,
        longitude,
    }
}

export interface CoordinatesModel extends ReturnType<typeof Coordinates> {}
