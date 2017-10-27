// Imports models
import { Location } from './../entities/location';

export interface ILocationRepository {

    create(deviceId: string, licenseDisc: Location): Promise<boolean>;

    list(deviceId: string): Promise<Location[]>;
}
