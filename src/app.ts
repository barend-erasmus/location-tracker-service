// Imports
import * as express from 'express';
import * as path from 'path';
import * as yargs from 'yargs';
import { config } from './config';

// Import Repositories
import { BaseRepository } from './repositories/sequelize/base';
import { LocationRepository } from './repositories/sequelize/location';

// Imports middleware
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';

// Imports routes
import { LocationRouter } from './routes/location';
import { HomeRouter } from './routes/home';

const locationRepository = new LocationRepository(config.database.host, config.database.username, config.database.password);

const argv = yargs.argv;
const app = express();

// Configures body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

// Configures view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', HomeRouter.index);
app.post('/location/create', LocationRouter.create);
app.get('/location/listSessions', LocationRouter.listSessions);
app.get('/location/list', LocationRouter.list);

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
