import { getRegionByCode } from '../../src/locations/entities/Location';

it('should return a region object with Alabama as its state', () => {
    const alabama = getRegionByCode('AL');

    expect(alabama.name).toBe('Alabama');
});
