// Imports
import { config } from './../config';

// Imports repositories
import { ILocationRepository } from './../repositories/location';

// Imports models
import { Location } from './../entities/location';

export class LocationService {

    constructor(private locationRepository: ILocationRepository) {

    }

    public async list(deviceId: string, startTimestamp: number, endTimestamp: number): Promise<Location[]> {
        return this.locationRepository.list(deviceId, startTimestamp, endTimestamp);
    }

    public async listSessions(deviceId: string): Promise<any[]> {
        const locations: Location[] = await this.locationRepository.list(deviceId, null, null);

        let startTimestamp: number = -1;
        let endTimestamp: number = -1;

        let previousLocation: Location;

        const result: any[] = [];

        for (const location of locations) {
            if (!previousLocation) {
                startTimestamp = location.timestamp;
                previousLocation = location;
                continue;
            } else if (location.timestamp - previousLocation.timestamp > 100000) {
                endTimestamp = location.timestamp;
                result.push([
                    startTimestamp,
                    endTimestamp,
                ]);

                startTimestamp = -1;
                endTimestamp = -1;
                previousLocation = null;
            } else {
                previousLocation = location;
            }
        }

        if (startTimestamp !== -1 && endTimestamp === -1) {
            endTimestamp = previousLocation.timestamp;
            result.push([
                startTimestamp,
                endTimestamp,
            ]);
        }

        return result;
    }

    public async create(
        deviceId: string,
        accuracy: number,
        altitude: number,
        bearing: number,
        speed: number,
        longitude: number,
        latitude: number,
        timestamp: number,
    ): Promise<Location> {

        const location = new Location(accuracy, altitude, bearing, speed, longitude, latitude, timestamp);

        await this.locationRepository.create(deviceId, location);

        return location;
    }

    public async createBulk(deviceId: string, locations: Location[]): Promise<Location[]> {

        await this.locationRepository.createBulk(deviceId, locations);

        return locations;
    }
}
