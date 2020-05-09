import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../../../api-docs/swagger/swagger.json');


export function swaggerUiStage(app: express.Application): express.Application  {
    if (process.env.NODE_ENV != 'production') {

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    return app;
}
