

import { middlewareFactory } from '@o-galaxy/ether/common';
 

export const Log = middlewareFactory((req, res, next) => {
    console.log('request url: ' + req.originalUrl);
    console.log('request body: ' + req.body);
    next();
})
