import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { PromotedItem } from './promoted-item';

type SchemaKeys = keyof PromotedItem;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {

    item_id: { type: String, required: true },
    item_type: { type: String, required: true },
    weight: { type: Number, required: true },
    note: { type: String, required: false },
}

export type PromotedItemDocument = PromotedItem & BaseDocument;

export const PromotedItemModel = model<PromotedItemDocument>(
    'promoted-items', 
    new Schema(schema, { timestamps: true, strict: false })
);
