import { Schema, model, Document } from 'mongoose';

export interface ILog {
    _id: Schema.Types.ObjectId;
    route: string;
    http: string,
    query: string,
    body: string;
    resp_status: number;
    error: string;
    error_custom_code: number;
    hasError: boolean;
    platform?: string;
    version?: string;
    timezone?: string;
}


const LogSchema = new Schema(
    {
        route: { type: String },
        query: { type: String },
        http: { type: String },
        body: { type: String },
        platform: { type: String },
        version: { type: String },
        timezone: { type: String },
        hasError: { type: Boolean, default: false },
        resp_status: { type: Number },
        error_custom_code: { type: Number },
        error: { type: String },
    }, 
    { timestamps: true }
)

LogSchema.set('toJSON', { transform: function (doc: any, ret: any, option: any) { return ret; } })

export type ILogModel = ILog & Document;
export const LogModel = model<ILogModel>('log', LogSchema)
