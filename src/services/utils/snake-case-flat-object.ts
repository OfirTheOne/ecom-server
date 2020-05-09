import * as _ from 'lodash';

export function snakeCaseFlatObject(obj: any) {

    if(Array.isArray(obj)) {
        return obj.map(snakeCaseFlatObject)
    } else {
        return Object.entries(obj).reduce(
            (sco, [k,v]) => ({ 
                ...sco, 
                [_.snakeCase(k)]: v && (typeof v == 'object') ? snakeCaseFlatObject(v) : v  
            }),
            {}
        );
    }

     
    
}