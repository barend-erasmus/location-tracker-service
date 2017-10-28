// Imports models
import { Location } from './../entities/location';

export interface ILocationRepository {

    create(deviceId: string, location: Location): Promise<boolean>;
    createBulk(deviceId: string, locations: Location[]): Promise<boolean>;
    list(deviceId: string, startTimestamp: number, endTimestamp: number): Promise<Location[]>;
}
