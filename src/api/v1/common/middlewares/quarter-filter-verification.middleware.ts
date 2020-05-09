


import { middlewareFactory } from '@o-galaxy/ether/common'

import { Guardian, NotEmpty, Match, DateFormat, ValueIn } from '@o-galaxy/guardian';



export const MeetingFilterParamsValidation = middlewareFactory(
    (() => {
        const guardian = new Guardian();
        guardian.on({
            path: 'year',
            errorMessage: 'year parameter invalid.'
        }).add([
            NotEmpty(), 
            Match(/^(19|20)[0-9]{2}$/)
        ]);

        guardian.on({
            path: 'quarter',
            errorMessage: 'quarter parameter invalid.'
        }).add([
            NotEmpty(), 
            Match(/^[1-4]{1}$/)
        ]);

        return guardian.toMiddleware('req.query');

    })()
);


export const AllMeetingFilterParamsValidation = middlewareFactory(
    (() => {
        const guardian = new Guardian();
        guardian.on({
            path: 'unit',
            errorMessage: 'unit parameter invalid.',
            layerKey: 'unit-restriction'
        }).add([
            NotEmpty(), 
            ValueIn('year', 'month')
        ]);

        guardian.on({
            path: ['from', 'to'],
            errorMessage: 'range-date parameters invalid.',
            layerKey: 'range-restriction',

        }).add([
            NotEmpty(), 
            DateFormat()
        ]);

        guardian.orReduction('unit-restriction', 'range-restriction')
        return guardian.toMiddleware('req.query');

    })()
);