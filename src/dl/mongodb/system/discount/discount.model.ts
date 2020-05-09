import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { Discount } from './discount';
import { ObjectID } from 'mongodb';

type SchemaKeys = keyof Discount;

const schema: Partial<Dictionary<any, SchemaKeys>>&SchemaDefinition  = {
    item_id: { type: ObjectID, required: true },
    final_price: { type: Number, required: false },
    percentage_reduction : { type: Number, required: false },
    amount_reduction: { type: Number, required: false },
    expiry_time: { type: Date, required: false },

}



export type DiscountDocument = Discount & BaseDocument;

export const DiscountModel = model<DiscountDocument>(
    'discounts', 
    new Schema(schema, { timestamps: true, strict: false })
);
