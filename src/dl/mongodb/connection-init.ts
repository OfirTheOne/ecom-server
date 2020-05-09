

import * as mongoose from 'mongoose';
import * as config from 'config';
import * as debug from 'debug';

const error = debug('mongooseInit:error');
const log = debug('mongooseInit:log');

const dbConfig = config.get('MongoDB.Configurations') as { [key: string]: string };
const uri = buildConnectionString(dbConfig);

const connectionOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true
};

if (dbConfig.user && dbConfig.password) {
    connectionOptions.auth = {
        user: dbConfig.user,
        password: dbConfig.password
    }
}

// connect to db
mongoose.connect(uri, connectionOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    error('connection error:', err);
    console.error('connection error:', err);
}).once('open', () => {
    log('DB connection success!');
    process.env.NODE_ENV != 'testing' ? console.log('DB connection success!') : undefined;
});


function buildConnectionString(dbConfig: { [key: string]: string }): string {
    const { user, port, host, database } = dbConfig
    let pass = dbConfig.password;
    pass = (!pass || pass.length <= 0) ? '' : `:${pass}@`;

    let authSource = ''
    if(user && pass){
        authSource = '?authSource=admin';
    }

    const uri = `mongodb://${host}:${port}/${database}${authSource}`
    return uri;
}