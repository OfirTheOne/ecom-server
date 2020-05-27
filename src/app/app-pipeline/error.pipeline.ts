import * as express from 'express';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';
import { errorMiddleware } from '../error-handler';


@AppPipeline()
export class ErrorPipeline implements IAppPipeline {
    pipe(app: express.Application): express.Application  {
        
        return app.use(errorMiddleware);

    }
}