import { SubCategory } from './sub-category';
import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../core/base-document'
import { ObjectID } from 'mongodb';

type SchemaKeys = keyof SubCategory;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {
    category: { type: ObjectID, required: true },
    name: { type: String, required: true },  
    description: { type: String, required: true },  
    position: { type: Number, required: true },  
}



export type SubCategoryDocument = SubCategory & BaseDocument;

export const SubCategoryModel = model<SubCategoryDocument>(
    'sub-categories', 
    new Schema(schema, { timestamps: true, strict: false })
);
