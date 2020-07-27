import * as Filter from '../../src/util/filter';

const values = [{
    color: 'green',
    active: true,
}, {
    color: 'green',
    active: false,
}, {
    color: 'red',
    active: false,
}, {
    color: 'green',
    active: true,
}, {
    color: 'yellow',
    active: true,
}];

const isActive = item => item.active;

const isGreen = item => item.color === 'green';

const isRed = item => item.color === 'red';

it('should return a boolean indicating that all assertions are true', () => {
    const matcher = Filter.matchesEach(isActive, isGreen);

    expect(matcher(values[0])).toBe(true);
    expect(matcher(values[1])).toBe(false);
});

it('should return a boolean indicating that some assertions are true', () => {
    const matcher = Filter.matchesSome(isActive, isGreen);

    expect(matcher(values[0])).toBe(true);
    expect(matcher(values[1])).toBe(true);
});

it('should return a boolean indicating that none of the assertions are true', () => {
    const matcher = Filter.matchesNone(isRed, isActive);

    expect(matcher(values[1])).toBe(true);
    expect(matcher(values[2])).toBe(false);
});

it('should only return items that pass each callback', () => {
    const getActiveGreenItems = Filter.filterByAll(isGreen, isActive);

    expect(getActiveGreenItems(...values)).toHaveLength(2);
});

it('should return items that pass any of the callbacks', () => {
    const getRedOrGreenItems = Filter.filterByAny(isGreen, isRed);

    expect(getRedOrGreenItems(...values)).toHaveLength(4);
});

it('should return items that do not match any of the callbacks', () => {
    const getItemsThatAreNotRedOrGreen = Filter.filterByNone(isGreen, isRed);

    expect(getItemsThatAreNotRedOrGreen(...values)).toHaveLength(1);
});
