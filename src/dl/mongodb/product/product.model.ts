import { Product } from './product.entity';
import { SchemaDefinition, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { ObjectID } from 'mongodb';
import { BaseDocument } from './../../core/base-document'

type SchemaKeys = keyof Product;

const schema: Partial<Dictionary<any, SchemaKeys>>&SchemaDefinition  = {

    sku: { type: String, required: true, index: { unique: true } }, 
    // id_sku: string,
    item_index:         { type: Number,     required: true }, 
    name:               { type: String,     required: true, index: { unique: true } }, 
    description:        { type: String,     required: true }, 
    note:               { type: String,     required: false }, 
    price:              { type: Number,     required: true }, 
    currency:           { type: String,     required: false }, 
    color_options:      { type: [String],   required: true }, 
    color_price_factor: { type: [Number],   default: [] }, 
    size_options:       { type: [String],   required: true },
    size_price_factor:  { type: [Number],   default: [] }, 
    category:        { type: ObjectID,   required: true },
    sub_category:    { type: ObjectID,   required: false },
    images_url:         { type: [String],   required: true },
    active:             { type: Boolean,    default: true },
    meta:               { type: {},         default: {} },

  
}



export type ProductDocument = Product & BaseDocument;

export const ProductModel = model<ProductDocument>(
    'products', 
    new Schema(schema, { timestamps: true, strict: false })
);
