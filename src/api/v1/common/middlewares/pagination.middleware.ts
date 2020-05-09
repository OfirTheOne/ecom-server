


import { middlewareFactory } from '@o-galaxy/ether/common'

import { Guardian, NotEmpty, Match, DateFormat, ValueIn, PositiveInteger } from '@o-galaxy/guardian';



export const Pagination = (skip: number, limit: number) => (middlewareFactory(
    (() => {
        const guardian = new Guardian();
        guardian.on({
            path: 'skip',
            errorMessage: 'skip parameter invalid.',
            optional: true,
            defaultValue: skip
            
        }).add([
            PositiveInteger().onResolve(({root, name, target}) => { root[name] = Number(target) })
        ]);

        guardian.on({
            path: 'limit',
            errorMessage: 'limit parameter invalid.',
            optional: true,
            defaultValue: limit
        }).add([
            PositiveInteger().onResolve(({root, name, target}) => { root[name] = Number(target) })
        ]);

        return guardian.toMiddleware('req.query');

    })()
)());
