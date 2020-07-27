import {
    BaseApiConfig,
    getQueryString,
    getWithoutLeadingSlash,
    getWithoutTrailingSlash,
} from '../src/http';

const getMockApiConfig = () => BaseApiConfig.fromJson({
    url: 'https://example.com/',
    options: {
        key: 'abc-123',
        headers: {
            'Content-Type': 'application/json',
        },
    },
});

it('should remove a trailing slash from the URL', () => {
    const url = getWithoutTrailingSlash('https://example.com/');

    expect(url).toBe('https://example.com');
});

it('should remove a leading slash from the URI', () => {
    const uri = getWithoutLeadingSlash('/users/me');

    expect(uri).toBe('users/me');
});


it('should return an encoded query string', () => {
    const queryString = getQueryString({
        foo: 'hello world!',
        bar: 'hello universe!',
    });

    expect(queryString).toEqual('foo=hello%20world!&bar=hello%20universe!');
});

it('should return a full URL to the example API', () => {
    const apiConfig = getMockApiConfig();

    const url = apiConfig.getUrlFor('/users/me', {
        key: 'abc-123'
    });

    expect(url).toBe('https://example.com/users/me?key=abc-123')
});
