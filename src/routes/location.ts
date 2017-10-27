// Imports
import * as express from 'express';
import * as moment from 'moment';
import { config } from './../config';

// Imports repositories
import { LocationRepository } from './../repositories/sequelize/location';

// Imports services
import { LocationService } from './../services/location';

// Imports models
import { Location } from './../entities/location';

export class LocationRouter {

    public static async create(req: express.Request, res: express.Response) {
        for (const item of req.body) {
            LocationRouter.getLocationService().create(
                req.get('x-device-id'),
                item.Accuracy,
                item.Altitude,
                item.Bearing,
                item.Speed,
                item.Longitude,
                item.Latitude,
                item.Timestamp,
            );
        }

        res.json('OK');
    }

    protected static getLocationService(): LocationService {

        const locationRepository: LocationRepository = new LocationRepository(config.database.host, config.database.username, config.database.password);

        const locationService: LocationService = new LocationService(locationRepository);

        return locationService;
    }
}
