import * as express from 'express';



export function notFoundStage(app: express.Application): express.Application  {
    
    app.use((req, res, next) => {
        return res.status(404).send('not found');
    });
    return app;
}
