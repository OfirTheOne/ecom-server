

import * as moment from 'moment'; 

export function createDateRange(from: Date, to: Date) {
    return[ moment(from).format('YYYY-MM-DD'), moment(to).format('YYYY-MM-DD') ];
}

export function backwardUnitToDateRange(backwardUnit: moment.unitOfTime.StartOf) {
    return [ moment().startOf(backwardUnit).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD') ];
}

export function quarterToDateRange(year: number, quarter: number) {
    return [
        moment({ year, month: ((quarter-1)*3), date: 1, hour: 0, minute: 0}).format('YYYY-MM-DD'),
        moment({ year: (parseInt(`${quarter}`) == 4 ? parseInt(`${year}`)+1 : year), month: ((quarter)*3)%12 || 0, date: 1, hour: 0, minute: 0}).format('YYYY-MM-DD')
    ]
}
