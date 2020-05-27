import * as express from 'express';
import * as cors from 'cors';
import * as config from 'config';
import { AppPipeline } from '@o-galaxy/ether/core';
import { pipeline } from 'stream';
import { IAppPipeline } from '@o-galaxy/ether/models';

const PRODUCTION_ENV_NAME = 'production'



@AppPipeline()
export class CorsPipeline implements IAppPipeline {

    pipe(app: express.Application): express.Application  {
    
        const allowedOrigins = config.get<Array<string>>('Security.AllowedOrigins')
        app.use(cors({ credentials: true, origin : allowedOrigins }));
        app.set('trust proxy', true);

        if (process.env.NODE_ENV != PRODUCTION_ENV_NAME) {
            app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
                // res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header("Access-Control-Allow-Headers", `Origin, X-Requested-With, Content-Type, Accept, ${config.get("Security.Request.Header.key")}`);
                next();
            });
        }
        return app;
    }
}
