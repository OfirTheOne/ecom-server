import { Application } from 'express'
import * as config from 'config'
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as connectMongo from 'connect-mongo';
import { AppPipeline } from '@o-galaxy/ether/core';

const MongoStore = connectMongo(session);


@AppPipeline()
export class SessionStorePipeline {
    pipe(app: Application)  {

        return app.use(session({
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'sessions',
            }),
            cookie: {
                secure: false,
                sameSite: false,
                maxAge: config.get<number>('Security.Session.minutesExpiry') * 60 * 1000 // in mil-sec
            },
            secret: config.get('Security.Session.secret'), 
            resave: false,
            saveUninitialized: true
        }));
    }
}