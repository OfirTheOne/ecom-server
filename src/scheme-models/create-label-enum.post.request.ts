


import { StringType, Transform, Required, ArrayType } from '@o-galaxy/scheme-construct/core';
import { ObjectID } from 'mongodb';


export class PostCreateLabelEnumBody {

        
        @Required()
        @StringType
        label_key: string;
    
        @Required()
        @StringType
        display_label_key: string;

        @Required()
        @ArrayType
        @Transform<PostCreateLabelEnumBody>(({value}) => (value as Array<any>).map(val => typeof val == 'string' ? ({ name: val}): val))
        label_values: Array<{ name: string }>;

    }