// Imports
import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected static sequelize: Sequelize.Sequelize = null;
    protected static models: {
        LicenseDisc: Sequelize.Model<{}, {}>,
    } = null;

    private static defineModels(): void {
        const LicenseDisc = BaseRepository.sequelize.define('locations', {
            accuracy: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            altitude: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            bearing: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            deviceId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            latitude: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            longitude: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            speed: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
        });

        this.models = {
            LicenseDisc
        };
    }

    constructor(private host: string, private username: string, private password: string) {

        if (!BaseRepository.sequelize) {
            BaseRepository.sequelize = new Sequelize('location-tracker', username, password, {
                dialect: 'postgres',
                host,
                logging: false,
                pool: {
                    idle: 10000,
                    max: 5,
                    min: 0,
                },
            });

            BaseRepository.defineModels();
        }
    }

    public sync(): Promise<void> {
        return new Promise((resolve, reject) => {
            BaseRepository.sequelize.sync({ force: true }).then(() => {
                resolve();
            });
        });
    }

    public close(): void {
        BaseRepository.sequelize.close();
    }
}
