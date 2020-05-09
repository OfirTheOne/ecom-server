


/**
 * @param record - original object to apply mapping
 * @param mapping - map like object, where each key in the local key ib th pre mapped object,
 *                  the value of that key is the mapped (foreign) key. 
 */
export function mapObject<T = {[key: string]: string}>(record: {[key: string]: any}, mapping: T) {
    const object = Object.entries(mapping).reduce((parsedObj, [key, foreignKey]) => {

        parsedObj[key] = record[foreignKey];
        if(parsedObj[key] == undefined) {
            const splitPath = foreignKey.split('.')
            if(splitPath.length > 1) {
                parsedObj[key] = record[splitPath[0]];
                
            }
        }
        return parsedObj;
    }, {} as {[key in keyof T]: any});
    return object
}