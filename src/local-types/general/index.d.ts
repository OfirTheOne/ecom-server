export type ArrayType<T> = T extends Array<infer L> ? L : never 


export type OverrideValueType<T, ValueType> = { [key in keyof T]: ValueType; }
