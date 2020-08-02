import { StackLogger } from '../../src/util/log';
import { ArrayLogger, CountLogger } from '../mocks/log';

const arrayLogger = new ArrayLogger();
const countLogger = new CountLogger();
const stackLogger = new StackLogger(arrayLogger, countLogger);

it('should log an info level message', () => {
    stackLogger.info('Hello world!');

    expect(arrayLogger.getLatestMessage()).toEqual('[INFO] Hello world!');
    expect(countLogger.messageCount).toEqual(1);
});

it('should log a warning level message', () => {
    stackLogger.warn('Hello world!');

    expect(arrayLogger.getLatestMessage()).toEqual('[WARN] Hello world!');
    expect(countLogger.messageCount).toEqual(2);
});

it('should log an error level message', () => {
    stackLogger.error('Hello world!');

    expect(arrayLogger.getLatestMessage()).toEqual('[ERROR] Hello world!');
    expect(countLogger.messageCount).toEqual(3);
});
