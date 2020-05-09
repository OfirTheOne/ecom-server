
import { PickByValue, ValuesType } from 'utility-types'


type Goo = {
    'foo': 'DFD',
    'pak': {key: 'kon'},
    'bar' : ['boo', ()=>true]
}




type BaseMappingEntryValue = (string | Function | [string, Function] | {key:string, [k:string]: any})

type MappingEntryValue <E extends BaseMappingEntryValue> = E


export type ParserMapping<
    T,                              // origin object type
    K extends keyof T = keyof T,    // mapped key type
    S extends 'strict' | 'non_strict' = 'non_strict',
    R = any                         // mapped value's type
> = { 
        [P in K]?: MappingEntryValue<
            (S extends 'strict' ? (K extends string ? K : never) : string) |               // map to key 
            ((o: T[P], root: T) => R) | // map to transform value
            [string, ((o: T[P extends K ? P : never], root: T) => R)] |         // map to transform value on new key
            {                                               // map using config
                key: string, 
                transform: ((o: T[P], root: T) => R), 
                preTransformFilter?: ((o: T[P]) => boolean), 
                postTransformFilter?: ((o: R) => boolean),
                default?: R 
            } >
    }




type moj = PostMappingKeys<ParserMapping<Goo>>

type PostMappingKeys< T extends { [key: string]: BaseMappingEntryValue } 
> =  
   keyof { 
        [P in ({ 
                [Key in keyof T]?: (
                    T[Key] extends string ? T[Key] : 
                    (
                        T[Key] extends [infer K1, Function] ? (K1 extends string ? K1 : never) : 
                        (
                            T[Key] extends { key: infer K2, [k:string]: any } ? (K2 extends string ? K2 : never) : never
                        )
                    )
                )
        } [keyof T])
        ]: T[P]; 
    }




 type k = PostMappingKeys<Goo> //ValuesType<{ [key: string]: (string | [string, Function] | {key:string, [k:string]: any}) }>


/**
 * @example 
 *  const obj = {
 *      name: "bob",
 *      age: 20,
 *      friends: [
 *          { name: "danny", heigh: 160},
 *          { name: "jon", heigh: 170}
 *      ]
 *  }
 *
 *  const parsedObj = parse(obj, {
 *      'name': 'age',
 *      'age': (age) => `${age}`,
 *      'friends': (friends) =>  friends.map(({name}) => name)
 *  })
 * 
 * @description
 * inferred as - (vscode will hint this) 
 * 
 * const parsedObj: {
 * 
 *      age: string;
 * 
 *      name: number;
 * 
 *      friends: string[];
 * 
 * }
 * 
 * 
 */
/*
export function parse<
T, 
S extends 'strict' | 'non_strict' = 'non_strict',
M extends ParserMapping<T, keyof T, S> = ParserMapping<T, keyof T, S>, 
K extends keyof M = keyof M,
D extends keyof PostMappingKeys<T, M> =  keyof PostMappingKeys<T, M>>
(obj: T, mapping: M):
    { [KEY in keyof D]: any
        // M[KEY] extends keyof T ? 
        //     T[M[KEY]] : 
        //     (
        //         M[KEY] extends ((...args: any) => any) ? 
        //             ReturnType<M[KEY]> : 
        //             any
        //     ) 
    };
export function parse<
T, 
S extends 'strict' | 'non_strict' = 'non_strict', 
M extends ParserMapping<T, keyof T, S> = ParserMapping<T, keyof T, S>, 
K extends keyof M = keyof M,
D extends keyof PostMappingKeys<T, M> =  keyof PostMappingKeys<T, M>>
(
    obj: T, 
    mapping: M, 
    options: {
        applyMapping?: (value: any) => boolean, 
        filterAfterMapping?: (value: any) => boolean
    }
): 
    { [KEY in keyof D]?: any
    // M[KEY] extends keyof T ? 
        //     T[M[KEY]] : 
        //     (
        //         M[KEY] extends ((...args: any) => any) ? 
        //             ReturnType<M[KEY]> : 
        //             any
        //     ) 
    };


    */
export function parse<
T, 
S extends 'strict' | 'non_strict' = 'non_strict',  
M extends ParserMapping<T, keyof T, S> = ParserMapping<T, keyof T, S>, 
K extends keyof M = keyof M>
(
    obj: T, 
    mapping: M, 
    options: {
        applyMapping?: (value: any) => boolean, 
        filterAfterMapping?: (value: any) => boolean
    } = {}
) {
    const mappedObject: any = {};
    for (let entry of Object.entries(mapping)) {
        const [originKey, mapper] = entry;
        
        let applyMapping = true;
        let finalMapKey: string;
        let finalMappedValue: any;

        if (options.applyMapping == undefined || options?.applyMapping(obj[originKey])) {

            if (typeof mapper == 'string') {

                finalMapKey = mapper;
                finalMappedValue = obj?.[originKey];

            } else if (typeof mapper == 'function') {

                let transform = mapper;
                finalMapKey = originKey;
                finalMappedValue = transform(obj[originKey], obj);

            } else if (Array.isArray(mapper)) {

                let [mapKey, transform] = mapper as [ string, Function ];
                finalMappedValue = transform(obj[originKey], obj);
                finalMapKey = mapKey;

            } else if (typeof mapper == 'object') {

                let mapOptions = mapper as {                                               
                    key: string, 
                    transform: Function, 
                    preTransformFilter?: Function, 
                    postTransformFilter?: Function,
                    default?: any
                };

                applyMapping = mapOptions.preTransformFilter == undefined || mapOptions.preTransformFilter(obj[originKey]);
                 
                if(applyMapping) {
                    finalMapKey = mapOptions.key;
                    finalMappedValue = mapOptions.transform(obj[originKey], obj);
                    applyMapping = mapOptions.postTransformFilter == undefined ? applyMapping : mapOptions.postTransformFilter(finalMappedValue)
                }

            }

            applyMapping =  (options.filterAfterMapping == undefined || options?.filterAfterMapping(obj[originKey]))

            if(applyMapping) {
                mappedObject[finalMapKey] = finalMappedValue;
            }
        }
    }

    return mappedObject;
}

/*
const obj = {
    name: "bob",
    age: 20,
    friends: [
        { name: "danny", heigh: 160 },
        { name: "jon", heigh: 170 }
    ]
}

const parsedObj = parse(obj, {
    'name': 'age',
    'age': (age) => `${age}`,
    'friends': (friends) => friends.map(({ name }) => name)
}, (s) => s != undefined)

*/