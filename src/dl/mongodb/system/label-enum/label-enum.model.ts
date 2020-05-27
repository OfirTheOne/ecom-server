import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { LabelEnum } from './label-enum';

type SchemaKeys = keyof LabelEnum;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {
    label_key: { type: String, required: true },
    display_label_key: { type: String, required: true },
    label_values: { type: [{ name: String, /*_id: true*/ }], required: true },
}

export type LabelEnumDocument = LabelEnum & BaseDocument;

export const LabelEnumModel = model<LabelEnumDocument>(
    'label-enums', 
    new Schema(schema, { timestamps: true, strict: false })
);
