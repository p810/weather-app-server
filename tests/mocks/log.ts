import { AbstractLogger, LogLevel } from '../../src/util/log';

export class ArrayLogger extends AbstractLogger {
    messages = [];

    log(message: string, level: LogLevel = LogLevel.Info) {
        this.messages.push(`[${level.toUpperCase()}] ${message}`);
    }

    getLatestMessage() {
        return this.messages[this.messages.length - 1];
    }
}

export class CountLogger extends AbstractLogger {
    messageCount = 0;

    log(message: string, level: LogLevel = LogLevel.Info) {
        this.messageCount++;
    }
}
