import { expect } from 'chai';
import 'mocha';

// Imports repositories
import { LocationRepository } from './../repositories/memory/location';

// Imports services
import { LocationService } from './location';

describe('LocationService', () => {
    describe('listSessions', () => {
        it('should return list of sessions', async () => {
            const locationService: LocationService = new LocationService(new LocationRepository());

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 10; j++) {
                    locationService.create(
                        'device-id',
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        100000 + (i * 110000) + (j * 1000),
                    );
                }
            }

            const result: any[] = await locationService.listSessions('device-id');

            expect(result.length).to.be.eq(3);
        });
    });
});
