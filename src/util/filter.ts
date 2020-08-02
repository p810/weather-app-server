export const matchesEach = function getMatchesEachCallback(...fns: Function[]) {
    return function matchesEach(value: any) {
        return fns.every(fn => fn(value));
    }
}

export const matchesSome = function getMatchesSomeCallback(...fns: Function[]) {
    return function matchesSome(value: any) {
        return fns.some(fn => fn(value));
    }
}

export const matchesNone = function getMatchesNoneCallback(...fns: Function[]) {
    return function matchesNone(value: any) {
        return fns.every(fn => ! fn(value));
    }
}

export const filterByAll = function getFilterMatchingAll<T>(...filters: Function[]) {
    return function filterByAll(...vals: T[]) {
        return vals.filter(val => matchesEach(...filters)(val));
    }
}

export const filterByAny = function getFilterMatchingAny<T>(...filters: Function[]) {
    return function filterByAny(...vals: T[]) {
        return vals.filter(val => matchesSome(...filters)(val));
    }
}

export const filterByNone = function getFilterMatchingNone<T>(...filters: Function[]) {
    return function filterByNone(...vals: T[]) {
        return vals.filter(val => matchesNone(...filters)(val));
    }
}
