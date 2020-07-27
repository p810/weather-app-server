import { pipe } from './util/composition';

export interface ApiConfig {
    readonly url: string;

    readonly options: {[key: string]: any};

    getUrlFor(endpoint: string, queryParams: object): string;
}

export class BaseApiConfig implements ApiConfig {
    readonly url: string;

    constructor(url: string, readonly options: object = {}) {
        this.url = getWithoutTrailingSlash(url);
    }

    getUrlFor(endpoint: string, queryParams: object = {}): string {
        endpoint = getWithoutSurroundingSlashes(endpoint);

        let queryString = getQueryString(queryParams);

        return `${this.url}/${endpoint}?${queryString}`;
    }

    static fromJson({ url, options }: Partial<ApiConfig>): ApiConfig {
        return new BaseApiConfig(url, options ?? {});
    }
}

export const getQueryString = (params: object) => {
    let parts: string[] = [];

    for (let pair of Object.entries(params)) {
        const [key, value] = pair.map(encodeURIComponent);

        parts.push(`${key}=${value}`);
    }

    return parts.join('&');
}

export const getWithoutTrailingSlash = (subject: string) => {
    if (subject.substr(-1) === '/') {
        subject = subject.substr(0, subject.length - 1);
    }

    return subject;
}

export const getWithoutLeadingSlash = (subject: string) => {
    if (subject.substr(0, 1) === '/') {
        subject = subject.substr(1);
    }

    return subject;
}

const getWithoutSurroundingSlashes = pipe(
    getWithoutLeadingSlash,
    getWithoutTrailingSlash,
);

export interface HttpAdapter {
    request<T extends unknown>(
        url: string,
        method?: string,
        options?: object,
    ): Promise<T>
}

export class FetchAdapter implements HttpAdapter {
    async request<T extends unknown>(
        url: string,
        method: string = 'GET',
        options: object = {},
    ): Promise<T> {
        Object.assign(options, { method });

        const response = await fetch(url, options);

        return response.json() as Promise<T>;
    }
}

export interface ApiClient {
    config?: ApiConfig;
    adapter: HttpAdapter;
}
