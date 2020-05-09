import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { LabelEntry } from './label-entry';
import { ObjectID } from 'mongodb';

type SchemaKeys = keyof LabelEntry;

const schema: Partial<Dictionary<any, SchemaKeys>>&SchemaDefinition  = {
    item_id: { type: ObjectID, required: true },
    label_value: { type: String, required: true },
    label_key: { type: String, required: true }
}



export type LabelEntryDocument = LabelEntry & BaseDocument;

export const LabelEntryModel = model<LabelEntryDocument>(
    'label-entries', 
    new Schema(schema, { timestamps: true, strict: false })
);
