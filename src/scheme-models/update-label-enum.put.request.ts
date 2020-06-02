


import { StringType, Transform, Required, ArrayType, Optional, ArrayOfSchemeRef } from '@o-galaxy/scheme-construct/core';
import { ObjectID } from 'mongodb';



class UpdateLabelValue {
  
    @Optional()
    @Transform(({value}) => new ObjectID(value))
    label_value_id?: ObjectID

    @Required()
    @StringType
    name: string

}

export class UpdateLabelEnumBody {

    @Required()
    @ArrayType
    @ArrayOfSchemeRef(UpdateLabelValue)
    label_values: Array<UpdateLabelValue>;

    @Required()
    @StringType
    label_key: string;


    @Required()
    @StringType
    display_label_key: string;

    // @Required()
    @Optional()
    @StringType
    @Transform(({value}) => new ObjectID(value))
    label_enum_id?: string;


}