import { codeToName } from './states.json';

export const Region = (name: string, code: string) => ({ name, code });

export const getRegionByCode = (code: string) => Region(codeToName[code], code);

export interface RegionModel extends ReturnType<typeof Region> {}

export const Location = (
    city: string,
    state: RegionModel,
    zip: string | number,
    coordinates: CoordinatesModel
) => ({ city, state, zip, coordinates });

export interface LocationModel extends ReturnType<typeof Location> {}

export const Coordinates = (
    latitude: number | string,
    longitude: number | string
) => ({ latitude, longitude });

export interface CoordinatesModel extends ReturnType<typeof Coordinates> {}
