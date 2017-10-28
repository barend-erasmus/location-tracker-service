// Imports
import { ILocationRepository } from './../location';
import { BaseRepository } from './base';

// Imports models
import { Location } from './../../entities/location';

export class LocationRepository extends BaseRepository implements ILocationRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async create(deviceId: string, location: Location): Promise<boolean> {

        await BaseRepository.models.LicenseDisc.create({
            accuracy: location.accuracy,
            altitude: location.altitude,
            bearing: location.bearing,
            deviceId,
            latitude: location.latitude,
            longitude: location.longitude,
            speed: location.speed,
            timestamp: location.timestamp,
        });

        return true;
    }

    public async createBulk(deviceId: string, locations: Location[]): Promise<boolean> {

        await BaseRepository.models.LicenseDisc.bulkCreate(locations.map((location) => {
            return {
                accuracy: location.accuracy,
                altitude: location.altitude,
                bearing: location.bearing,
                deviceId,
                latitude: location.latitude,
                longitude: location.longitude,
                speed: location.speed,
                timestamp: location.timestamp,
            }
        }));

        return true;
    }

    public async list(deviceId: string, startTimestamp: number, endTimestamp: number): Promise<Location[]> {

        if (!startTimestamp && !endTimestamp) {
            const locations: any[] = await BaseRepository.models.LicenseDisc.findAll({
                order: [
                    ['timestamp', 'ASC'],
                ],
                where: {
                    deviceId,
                },
            });

            return locations.map((x) => new Location(parseFloat(x.accuracy), parseFloat(x.altitude), parseFloat(x.bearing), parseFloat(x.speed), parseFloat(x.latitude), parseFloat(x.longitude), parseInt(x.timestamp)));

        } else {
            const locations: any[] = await BaseRepository.models.LicenseDisc.findAll({
                order: [
                    ['timestamp', 'ASC'],
                ],
                where: {
                    deviceId,
                    timestamp: {
                        $gte: startTimestamp,
                        $lt: endTimestamp,
                    },
                },
            });

            return locations.map((x) => new Location(parseFloat(x.accuracy), parseFloat(x.altitude), parseFloat(x.bearing), parseFloat(x.speed), parseFloat(x.latitude), parseFloat(x.longitude), parseInt(x.timestamp)));
        }
    }
}
