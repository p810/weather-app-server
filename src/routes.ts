import {
    ApiClient,
    isErrorResult,
    ApiResultObject,
    isRecoverable,
    ApiResult,
} from './http';
import { Request, Response } from 'express';
import { Logger } from './util/log';

export const enum Domains {
    Location = 'location',
    Weather = 'weather',
};

export type DomainToClients = {
    [key in Domains]: ApiClient[];
};

export type ClientController<T extends ApiClient> = (client: T, req: Request) => Promise<ApiResultObject>;

export class ResponderFactory {
    constructor(
        readonly clients: ApiClient[],
        readonly logger: Logger,
    ) {}

    getResponder(cb: ClientController<ApiClient>, clients?: ApiClient[]) {
        return async (req: Request, res: Response) => {
            var result: ApiResultObject = ApiResult({
                error: 'Could not reach third party APIs'
            }, 500);

            clients = clients ?? this.clients;

            for (let client of clients) {
                try {
                    result = await cb(client, req);

                    if (! isErrorResult(result)) {
                        break;
                    }
                } catch (e) {
                    this.logException(e);

                    if (isRecoverable(e)) {
                        continue;
                    }

                    let message = e instanceof Error ? e.message : e;

                    return res.status(500).json({ message });
                }
            }

            return this.getResponseFromResult(result, res);
        }
    }

    getResponseFromResult(result: ApiResultObject, res: Response): Response {
        let headers = Object.entries(result.headers ?? {});

        for (let pair of headers) {
            const [header, value] = pair;

            res.setHeader(header, value);
        }

        return res.status(result.statusCode).json(result.payload);
    }

    protected logException(e: string | Error) {
        if (e instanceof Error) {
            e = e.message;
        }

        this.logger.error(e);
    }
}
