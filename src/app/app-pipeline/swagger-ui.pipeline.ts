import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { AppPipeline } from '@o-galaxy/ether/core';
import { IAppPipeline } from '@o-galaxy/ether/models';
const swaggerDocument = require('../../../api-docs/swagger/swagger.json');


@AppPipeline()
export class SwaggerUiPipeline implements IAppPipeline {
    pipe(app: express.Application): express.Application  {
        if (process.env.NODE_ENV != 'production') {
    
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
        return app;
    }

}
