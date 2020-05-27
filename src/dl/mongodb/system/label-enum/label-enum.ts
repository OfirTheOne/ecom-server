import { ObjectID } from 'mongodb';

export interface LabelEnum {

    label_key: string,
    display_label_key: string,
    label_values: Array<{ name: string, _id?: ObjectID}>,
}