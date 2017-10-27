// Imports
import { config } from './../config';

// Imports repositories
import { ILocationRepository } from './../repositories/location';

// Imports models
import { Location } from './../entities/location';

export class LocationService {

    constructor(private locationRepository: ILocationRepository) {

    }

    public async list(deviceId: string): Promise<Location[]> {
        return this.locationRepository.list(deviceId);
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
}
