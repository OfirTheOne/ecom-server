import * as express from 'express';
import * as helmet from 'helmet';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';

@AppPipeline()
export class HelmetPipeline implements IAppPipeline {
    pipe(app: express.Application): express.Application  {
        
        app.use(helmet());
    
        return app;
    }

}
