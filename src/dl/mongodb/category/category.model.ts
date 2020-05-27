import { Category } from './category';
import { SchemaDefinition, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../core/base-document'



type SchemaKeys = keyof Category;

const schema: Partial<Dictionary<any, SchemaKeys>>&SchemaDefinition  = {
    name: { type: String, required: true },  
    description: { type: String, required: true },  
    position: { type: Number, required: true },  
}



export type CategoryDocument = Category & BaseDocument;

export const CategoryModel = model<CategoryDocument>(
    'categories', 
    new Schema(schema, { timestamps: true, strict: false })
);
