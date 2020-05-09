import * as express from 'express';
import * as bodyParser from 'body-parser';


export function bodyParserStage(app: express.Application): express.Application  {
    
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    return app;
}
