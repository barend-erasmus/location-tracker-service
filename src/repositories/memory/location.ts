// Imports
import { ILocationRepository } from './../location';

// Imports models
import { Location } from './../../entities/location';

export class LocationRepository implements ILocationRepository {

    private locations: {} = [];

    public async create(deviceId: string, location: Location): Promise<boolean> {

        if (!this.locations[deviceId]) {
            this.locations[deviceId] = [];
        }

        this.locations[deviceId].push(location);

        return true;
    }

    public async createBulk(deviceId: string, locations: Location[]): Promise<boolean> {

        if (!this.locations[deviceId]) {
            this.locations[deviceId] = [];
        }

        this.locations[deviceId] = this.locations[deviceId].concat(locations);

        return true;
    }

    public async list(deviceId: string): Promise<Location[]> {
        return this.locations[deviceId];
    }
}
