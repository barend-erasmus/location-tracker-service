// Imports
import * as express from 'express';
import { config } from './../config';

// Imports repositories
import { LocationRepository } from './../repositories/sequelize/location';

// Imports services
import { LocationService } from './../services/location';

// Imports models
import { Location } from './../entities/location';

export class LocationRouter {

    public static async create(req: express.Request, res: express.Response) {
        await LocationRouter.getLocationService().createBulk(
            req.get('x-device-id'),
            req.body.map((item) => new Location(
                item.Accuracy,
                item.Altitude,
                item.Bearing,
                item.Speed,
                item.Longitude,
                item.Latitude,
                item.Timestamp,
            ))
        );

        res.json('OK');
    }

    public static async list(req: express.Request, res: express.Response) {
        const locations = await LocationRouter.getLocationService().list(req.query.deviceId, req.query.startTimestamp, req.query.endTimestamp);
        res.json(locations);
    }

    public static async listSessions(req: express.Request, res: express.Response) {
        const sessions = await LocationRouter.getLocationService().listSessions(req.query.deviceId);
        res.json(sessions);
    }

    protected static getLocationService(): LocationService {

        const locationRepository: LocationRepository = new LocationRepository(config.database.host, config.database.username, config.database.password);

        const locationService: LocationService = new LocationService(locationRepository);

        return locationService;
    }
}
