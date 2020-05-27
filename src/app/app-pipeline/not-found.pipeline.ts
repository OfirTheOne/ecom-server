import * as express from 'express';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';


@AppPipeline()
export class NotFoundPipeline implements IAppPipeline {
    pipe(app: express.Application): express.Application  {
        
        app.use((req, res, next) => {
            return res.status(404).send('not found');
        });
        return app;
    }
}