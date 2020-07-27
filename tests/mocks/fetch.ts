var actualFetch = global.fetch;
const noop = () => null;

const setFetchMock = () => global.fetch = jest.fn();

const restoreFetch = () => global.fetch = actualFetch;

export const setupFetchMock = <T extends any>(
    init?: (mock: jest.Mock<Promise<T>>) => void
) => {
    let cb = init ?? noop;
    var fetchMock: jest.Mock<Promise<T>> = setFetchMock();

    cb(fetchMock);

    return restoreFetch;
};
