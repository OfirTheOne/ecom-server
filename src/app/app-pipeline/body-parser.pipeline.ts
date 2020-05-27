import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';


@AppPipeline()
export class BodyParserPipeline implements IAppPipeline {
    pipe(app: express.Application): express.Application  {
        
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
        return app;
    }
}
