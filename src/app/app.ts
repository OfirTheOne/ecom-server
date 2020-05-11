import './pre-app-init';
// == 
import * as express from 'express';
import * as cookieParser from 'cookie-parser'
import * as admin from 'firebase-admin';

import { apiRouter } from '../api';
import { errorMiddleware } from './error-handler';

// import { sessionStoreStage } from './app-stages/session-store.app-stage';
import { corsStage } from './app-stages/cors.app-stage';
import { helmetStage } from './app-stages/helmet.app-stage';
import { bodyParserStage } from './app-stages/body-parser.app-stage';
import { swaggerUiStage } from './app-stages/swagger-ui.stage';
import { notFoundStage } from './app-stages/not-found.stage';



export class App {
    public app: express.Application;
    public port: number;

    constructor(port: any) {

        this.app = express();
        this.port = port;
        this.initAppUsage();

    }

    private initAppUsage() {

        helmetStage(this.app);
        bodyParserStage(this.app)
        swaggerUiStage(this.app)
        // this.app.use('/api/', express.static(__dirname + '/../../webApidoc'));
        corsStage(this.app);
        this.app.use(cookieParser());

        // sessionStoreStage(this.app);
        this.initializeRoutes();
        this.app.use(errorMiddleware);
        notFoundStage(this.app);
        this.initFirebase();
    }

    private initFirebase() {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
        });
        // if (process.env.LOCAL_FIREBASE_UID) {
        //     FirebaseController.getIdToken(process.env.LOCAL_FIREBASE_UID);
        // }
    }


    private initializeRoutes() {
        this.app.set('view engine','ejs')
        this.app.use('/api/', apiRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


    