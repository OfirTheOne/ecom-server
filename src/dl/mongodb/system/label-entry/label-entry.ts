import { ObjectID } from 'mongodb';

export interface LabelEntry {

    item_id: ObjectID,
    label_key?: string,
    label_key_id: ObjectID,

    label_value?: string,
    label_value_id: ObjectID,
}