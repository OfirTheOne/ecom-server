import * as express from 'express';
import * as helmet from 'helmet';

export function helmetStage(app: express.Application): express.Application  {
    
    app.use(helmet());

    return app;
}
