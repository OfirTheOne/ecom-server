


import { StringType, Transform, Required, ArrayOfSchemeRef } from '@o-galaxy/scheme-construct/core';
import { ObjectID } from 'mongodb';



export class AssignedLabel {

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

export class PostAssignLabelBody {

    @ArrayOfSchemeRef(AssignedLabel)
    labels: Array<AssignedLabel>

}