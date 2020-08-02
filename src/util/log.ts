export const enum LogLevel {
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export interface Logger {
    log(message: string, level?: LogLevel);

    info(message: string);

    warn(message: string);

    error(message: string);
}

export abstract class AbstractLogger implements Logger {
    abstract log(message: string, level?: LogLevel);

    info(message: string) {
        this.log(message, LogLevel.Info);
    }

    warn(message: string) {
        this.log(message, LogLevel.Warn);
    }

    error(message: string) {
        this.log(message, LogLevel.Error);
    }
}

export class ConsoleLogger extends AbstractLogger {
    log(message: string, level: LogLevel = LogLevel.Info) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
}

export class NullLogger extends AbstractLogger {
    log(level: LogLevel, message: string) {}
}

export class StackLogger extends AbstractLogger {
    protected readonly loggers: Logger[];

    constructor(...loggers: Logger[]) {
        super();
        this.loggers = loggers;
    }

    log(message: string, level: LogLevel = LogLevel.Info) {
        for (let logger of this.loggers) {
            logger.log(message, level);
        }
    }
}
