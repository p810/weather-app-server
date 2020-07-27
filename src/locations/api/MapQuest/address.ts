import { pipe } from '../../../util/composition';

export type Response = {
    results: Result[];
    info: ResponseInfo;
}

export type ResponseInfo = {
    statuscode: number;
    messages: string[];
}

export type Result = {
    providedLocation?: {
        location: string;
    };
    locations: Location[];
}

export const getResultsFromResponse = ({ results }: Response): Result[] => {
    results = results ?? [];

    return results.filter(result => result.locations?.length);
}

/** @todo use partial at call sites
 * call sites instead of here? */
export type Location = Partial<{
    street: string;
    postalCode: string;
    geocodeQuality: string;
    geocodeQualityCode: string;
    latLng: {
        lat: number | string;
        lng: number | string;
    };
    displayLatLng: {
        lat: number | string;
        lng: number | string;
    };
    adminArea6: string;
    adminArea6Type: string;
    adminArea5: string;
    adminArea5Type: string;
    adminArea4: string;
    adminArea4Type: string;
    adminArea3: string;
    adminArea3Type: string;
    adminArea2: string;
    adminArea2Type: string;
    adminArea1: string;
    adminArea1Type: string;
    dragPoint: boolean;
    sideOfStreet: string;
    linkId: string;
    unknownInput: string;
    type: string;
    mapUrl: string;
}>

export const getLocationsFromResults = (results: Result[]): Location[] =>
    results.flatMap(result => [...result.locations]);

export const getLocationsFromResponse = pipe(
    getResultsFromResponse,
    getLocationsFromResults
);

export const enum Quality {
    Zip = 'ZIP',
    Street = 'STREET',
    Point = 'POINT',
    Address = 'ADDRESS',
    Intersection = 'INTERSECTION',
    Coutry = 'COUNTRY',
    State = 'STATE',
    Neighborhood = 'NEIGHBORHOOD',
}

export const enum StatusCodes {
    Ok = 0,
    BadInput = 400,
    BadKey = 403,
    Error = 500,
}

export const isSuccessResponse = (status: number) => status === StatusCodes.Ok;

export const isErrorResponse = (status: number) => status >= StatusCodes.BadInput;

export const enum Confidence {
    Exact = 'A',
    Good = 'B',
    Approximate = 'C',
    Unused = 'X',
}

export const isExactMatch = (confidence: string) => confidence === Confidence.Exact;

export const isGoodMatch = (confidence: string) => confidence === Confidence.Good;

export const isApproximateMatch = (confidence: string) => confidence === Confidence.Approximate;

export const isUnusedGranularity = (confidence: string) =>  confidence === Confidence.Unused;

export const getPostalCodeConfidence = (qualityCode: string) => qualityCode.substr(-1);
