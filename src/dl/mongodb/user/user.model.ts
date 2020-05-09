import { User } from './user';
import { SchemaDefinition, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../core/base-document'

type SchemaKeys = keyof User;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {
    email:  { type: String, required: true, index: { unique: true } },  
    uid:    { type: [String], required: true, index: { unique: true } },
    profile_data: {
        first_name: String, 
        last_name: String, 
    },
    is_anon: { type: Boolean, default: false },

    finish_onboarding: { type: Boolean, default: false },
    notification: { type: Boolean, default: false },
    device_token: { type: [String], default: [] },
}



export type UserDocument = User & BaseDocument;

export const UserModel = model<UserDocument>(
    'users', 
    new Schema(schema, { timestamps: true, strict: false })
);
