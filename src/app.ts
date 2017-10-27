// Imports
import * as express from 'express';
import * as yargs from 'yargs';
import { config } from './config';

// Import Repositories
import { BaseRepository } from './repositories/sequelize/base';
import { LocationRepository } from './repositories/sequelize/location';

// Imports middleware
import * as bodyParser from 'body-parser';

// Imports routes
import { LocationRouter } from './routes/location';

const locationRepository = new LocationRepository(config.database.host, config.database.username, config.database.password);

const argv = yargs.argv;
const app = express();

// Configures body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/location/create', LocationRouter.create);

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
