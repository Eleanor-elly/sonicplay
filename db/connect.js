import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger'
import config from '../core/config/config'

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { useMongoClient: true });
        logger.info('Connected to MongoDB');
    }
    catch (err) {
        logger.error('Could not connect to MongoDB');
    }
}

export default connectToDb;
