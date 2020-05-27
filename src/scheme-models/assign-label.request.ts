


    import { StringType, Transform, Required } from '@o-galaxy/scheme-construct/core';
    import { ObjectID } from 'mongodb';
    

export class PostAssignLabelBody {

        @Required()
        @StringType
        @Transform(({value}) => new ObjectID(value))
        item_id: ObjectID;
        
        @Required()
        @StringType
        @Transform(({value}) => new ObjectID(value))
        label_key: ObjectID;
    
        @Required()
        @StringType
        @Transform(({value}) => new ObjectID(value))
        label_value: ObjectID;
    }