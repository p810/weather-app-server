import { pipe, compose } from '../../src/util/composition';

const shout = (phrase: string) => phrase.toUpperCase();

const exclaim = (phrase: string) => `${phrase}!`;

const parentheses = (phrase: string) => `(${phrase})`;

it('should return the string after calling each callback left to right', () => {
    const transformer = pipe(shout, exclaim, parentheses);

    expect(transformer('hello world')).toBe('(HELLO WORLD!)');
});

it('should return the string after calling each callback right to left', () => {
    const transformer = compose(shout, exclaim, parentheses);

    expect(transformer('hello world')).toBe('(HELLO WORLD)!');
});
