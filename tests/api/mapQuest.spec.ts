import { config, returnLocations } from '../mocks/mapQuest';
import { Coordinates, Region } from '../../src/locations/entities/location';
import MapQuestClient from '../../src/locations/api/mapQuest';
import { FetchAdapter } from '../../src/http';
import { setupFetchMock } from '../mocks/fetch';

const adapter = new FetchAdapter();

const client = new MapQuestClient(config, adapter);

it('should return a location result response', async () => {
    const restore = setupFetchMock(mock => mock.mockImplementationOnce(returnLocations));

    const location = await client.getLocationByZip('35222');
    const expectedCoordinates = Coordinates(33.523657, -86.769112);
    const expectedRegion = Region('Alabama', 'AL');

    expect(location.zip).toBe('35222');
    expect(location.city).toBe('Birmingham');
    expect(location.state).toStrictEqual(expectedRegion);
    expect(location.coordinates).toStrictEqual(expectedCoordinates);

    restore();
})
