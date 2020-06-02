
/*



import { StringType, ArrayType, Transform, Required } from '@o-galaxy/scheme-construct/core';
import { ObjectID } from 'mongodb';


class LabelValue {

    @Required()
    @Transform(({value}) => ObjectID.isValid(value))
    _id: ObjectID

    @Required()
    @StringType
    name: string;
}



class LabelEnum {

    @Required()
    @Transform(({value}) => ObjectID.isValid(value))
    _id: ObjectID

    @Required()
    @StringType
    display_label_key: string;

    @Required()
    @StringType
    label_key: string;

    @ArrayType
    label_values: 
}



export class GetEnumLabelBodyResponse {

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

[
    {
        "_id": "5ece64adb656ef3ffb0a8f85",
        "display_label_key": "Occasion",
        "label_key": "occasion",
        "label_values": [
            {
                "_id": "5ece64adb656ef3ffb0a8f86",
                "name": "Date Night In"
            },
            {
                "_id": "5ece64adb656ef3ffb0a8f87",
                "name": "Guest Of"
            },
            {
                "_id": "5ece64adb656ef3ffb0a8f88",
                "name": "Vacay Dreamin"
            },
            {
                "_id": "5ece64adb656ef3ffb0a8f89",
                "name": "WFH-Approved"
            }
        ],
        "createdAt": "2020-05-27T13:01:35.637Z",
        "updatedAt": "2020-05-27T13:01:35.637Z",
        "__v": 0
    }
]

*/