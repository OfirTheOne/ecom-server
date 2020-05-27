import { Guardian, NotEmpty, Match, PositiveInteger, DateFormat, InRange,  } from '@o-galaxy/guardian';
import { middlewareFactory } from '@o-galaxy/ether/common';

export const ParseFilterProductParams = middlewareFactory(
    (() => {
        const guardian = new Guardian();
        guardian.on({
            path: 'min_price',
            errorMessage: 'min_price parameter invalid.',
            optional: true,
        }).add([
            NotEmpty(), 
            PositiveInteger().onResolve(({ root, target}) => target != undefined ? root['min_price'] = Number(target) : 0)
        ]);

        guardian.on({
            path: 'max_price',
            errorMessage: 'max_price parameter invalid.',
            optional: true,
        }).add([
            NotEmpty(), 
            PositiveInteger().onResolve(({ root, target}) => target != undefined ? root['max_price'] = Number(target) : 0)
        ]);

        return guardian.toMiddleware('req.query');

    })()
);


export const ParseDiscountProductBody = middlewareFactory(
    (() => {
        const guardian = new Guardian();

        guardian.on({
            path: 'item_id',
            errorMessage: 'item_id parameter invalid.',
        }).add([
            NotEmpty()
        ]);

        guardian.on({
            path: 'expiry_time',
            errorMessage: 'expiry_time parameter invalid.',
        }).add([
            NotEmpty(), 
            
            // DateFormat().onResolve(({ root, target}) => new Date(target) )
        ]);

        guardian.on({
            path: 'percentage_reduction',
            errorMessage: 'percentage_reduction parameter invalid.',
            optional: true,
        }).add([
            NotEmpty(), 
            InRange(1, 100).onResolve(({ root, target}) => target != undefined ? root['percentage_reduction'] = Number(target) : 0)
        ]);

        return guardian.toMiddleware('req.query');

    })()
);