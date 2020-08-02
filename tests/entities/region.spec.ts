import { RegionByCode } from '../../src/locations/entities/Location';

it('should return a region object with Alabama as its state', () => {
    const alabama = RegionByCode('AL');

    expect(alabama.name).toBe('Alabama');
});
