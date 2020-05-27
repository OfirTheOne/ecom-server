import { ObjectID } from 'mongodb';

export interface LabelEntry {

    item_id: ObjectID,
    label_key: ObjectID,
    // label_key_id: ObjectID,

    label_value: ObjectID,
    // label_value_id: ObjectID,
}