import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary, ValueOf } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { AdminUser } from './admin-user';
import { ObjectID } from 'mongodb';



type SchemaKeys = keyof AdminUser;

const schema: Partial<Dictionary<ValueOf<SchemaDefinition>, SchemaKeys>>  = {

    role: { type: String, required: true },
    user_id: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true },
    username: { type: String, required: true },
    hash: { type: String, required: true },
    permissions: { type: [ ObjectID ], required: true },
    meta: { type: {}, default: {} },

}



export type AdminUserDocument = AdminUser & BaseDocument;

export const AdminUserModel = model<AdminUserDocument>(
    'admin-users', 
    new Schema(schema, { timestamps: true, strict: false })
);
