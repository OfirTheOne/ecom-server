import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary, ValueOf } from 'ts-essentials';
import { BaseDocument } from './../../../core/base-document'
import { ApiPermission } from './api-permission';

type ApiPermissionSchemaKeys = keyof ApiPermission;

const apiPermissionSchemaDef: Partial<Dictionary<ValueOf<SchemaDefinition>, ApiPermissionSchemaKeys>> = {
    api_endpoints: { type: [String], required: true },
    permission_identifier: { type: String, required: true, index: { unique: true } },
    descriptions: { type: String, required: false }
};

const apiPermissionSchema = new Schema(
    apiPermissionSchemaDef,
    { timestamps: true, strict: false, _id: false }
)



export type ApiPermissionDocument = ApiPermission & BaseDocument;

export const ApiPermissionModel = model<ApiPermissionDocument>(
    'api-permissions', 
    new Schema(apiPermissionSchema, { timestamps: true, strict: false })
);
