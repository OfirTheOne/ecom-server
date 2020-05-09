export * from './async-request';
export * from './insert-at';
export * from './random-code-gen';
export * from './map-object';
export * from './inject-object-to-class';


export function whereCondDoAction<T extends {[key: string]: any}>(collection: (T|Array<T>), cond: (Function|Array<Function>), action: (Function|Array<Function>)): (T|Array<T>);
export function whereCondDoAction<T>(collection: Array<T>, cond: (Function|Array<Function>), action: (Function|Array<Function>)): Array<T> {

    const collectionIsArray = Array.isArray(collection); 
    const canonizedArray = Array.isArray(collection) ? 
        collection : 
        Object.entries(collection);

    const actions = Array.isArray(action) ? action : [action];
    const conditions = Array.isArray(cond) ? cond : [cond];


    for(let item of canonizedArray) {

        const itemsToSpread = (collectionIsArray ? 
            [item]  /* = single value */ : 
            item    /* = [key,value]*/ 
        ) as Array<any>;

        if(conditions.every(condition => condition(...itemsToSpread))) {
            for(let act of actions) {
                try {
                    act();
                } catch (error) {
                    throw error;
                }
            }
        }
    }

    return collection;

}