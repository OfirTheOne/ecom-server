

import { middlewareFactory } from '@o-galaxy/ether/common';
 
import * as rateLimit from 'express-rate-limit'
import * as slowDownLimiter from 'express-slow-down'


export const RateLimiter = middlewareFactory(  
    rateLimit({
        windowMs: 60 * 60 * 1000, // 60 minutes
        max: 5, // limit each IP to 100 requests per windowMs
        keyGenerator: (req, res) => req.session.id
    })
);

export const SlowDownLimiter = middlewareFactory(
    slowDownLimiter({
        windowMs: 10 * 60 * 1000, // 60 minutes
        delayAfter: 5,
        keyGenerator: (req, res) => req.session.id
    })
);
