export const matchesEach = (...fns: Function[]) => val => fns.every(fn => fn(val));

export const matchesSome = (...fns: Function[]) => val => fns.some(fn => fn(val));

export const matchesNone = (...fns: Function[]) => val => fns.every(fn => ! fn(val));

export const filterByAll = <T>(...filters: Function[]) => (...vals: T[]) =>
    vals.filter(val => matchesEach(...filters)(val));

export const filterByAny = <T>(...filters: Function[]) => (...vals: T[]) =>
    vals.filter(val => matchesSome(...filters)(val));

export const filterByNone = <T>(...filters: Function[]) => (...vals: T[]) =>
    vals.filter(val => matchesNone(...filters)(val));
