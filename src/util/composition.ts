export const pipe = (...fns: Function[]) =>
    value => fns.reduce((prev, fn) => fn(prev), value);

export const compose = (...fns: Function[]) =>
    value => fns.reduceRight((prev, fn) => fn(prev), value);
