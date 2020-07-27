export interface Logger {
    log(level: string, message: string): this;

    info(message: string): this;

    warn(message: string): this;

    error(message: string): this;
}

export const enum LogLevel {
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export class ConsoleLogger implements Logger {
    log(level: string, message: string): this {
        switch (level) {
            case LogLevel.Warn:
                console.warn(message);
                break;
            case LogLevel.Error:
                console.error(message);
                break;
            default:
                console.log(message);
                break;
        }

        return this;
    }

    info(message: string): this {
        return this.log(LogLevel.Info, message);
    }

    warn(message: string): this {
        return this.log(LogLevel.Warn, message);
    }

    error(message: string): this {
        return this.log(LogLevel.Error, message);
    }
}
