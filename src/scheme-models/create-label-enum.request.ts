


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
        label_values: Array<{ name: string }>;

    }