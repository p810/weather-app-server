export const pipe = function pipe(...fns: Function[]) {
    return function callLeftToRight(value: any) {
        return fns.reduce((prev, fn) => fn(prev), value);
    }
}

export const compose = function compose(...fns: Function[]) {
    return function callRightToLeft(value: any) {
        return fns.reduceRight((prev, fn) => fn(prev), value);
    }
}
