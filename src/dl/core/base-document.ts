

import { Document } from 'mongoose'

export interface TimestampDocument {
    createdAt: Date,
    updatedAt: Date,
}


export interface BaseDocument extends Document, TimestampDocument {

}

