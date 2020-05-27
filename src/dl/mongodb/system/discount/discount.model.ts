import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { Discount } from './discount';
import { ObjectID } from 'mongodb';

type SchemaKeys = keyof Discount;

const schema: Partial<Dictionary<any, SchemaKeys>>&SchemaDefinition  = {
    item_id: { type: ObjectID, required: true },
    percentage_reduction : { 
        type: Number, 
        required: function() {  return this.final_price == undefined && this.amount_reduction == undefined; }, 
        min: 0, 
        max: 100 
    },
    final_price: { 
        type: Number, 
        min: 0, 
        required: function() {  return this.percentage_reduction == undefined && this.amount_reduction == undefined; }, 
    },
    amount_reduction: { 
        type: Number, 
        min: 0, 
        required: function() {  return this.percentage_reduction == undefined && this.final_price == undefined; }, 

    },
    expiry_time: { type: Date, required: true },

}



export type DiscountDocument = Discount & BaseDocument;

export const DiscountModel = model<DiscountDocument>(
    'discounts', 
    new Schema(schema, { timestamps: true, strict: false })
);
