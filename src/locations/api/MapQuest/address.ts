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

export const getResultsFromResponse = function getResultsFromResponse({ results }: Response): Result[] {
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

export const getLocationsFromResults = function getLocationFromResults(results: Result[]): Location[] {
    return results.flatMap(result => [...result.locations]);
}

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

export const isSuccessResponse = function isSuccessResponse(status: number) {
    return status === StatusCodes.Ok;
}

export const isErrorResponse = function isErrorResponse(status: number) {
    return status >= StatusCodes.BadInput;
}

export const enum Confidence {
    Exact = 'A',
    Good = 'B',
    Approximate = 'C',
    Unused = 'X',
}

export const isExactMatch = function isExactMatch(confidence: string) {
    return confidence === Confidence.Exact;
}

export const isGoodMatch = function isGoodMatch(confidence: string) {
    return confidence === Confidence.Good;
}

export const isApproximateMatch = function isApproximateMatch(confidence: string) {
    return confidence === Confidence.Approximate;
}

export const isUnusedGranularity = function isUnusedGranularity(confidence: string) {
    return confidence === Confidence.Unused;
}

export const getPostalCodeConfidence = function getPostalCodeConfidence(qualityCode: string) {
    return qualityCode.substr(-1);
}
