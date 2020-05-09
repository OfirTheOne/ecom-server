import { Order } from './order';
import { SchemaDefinition, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../core/base-document'
import { ObjectID } from 'mongodb';



type SchemaKeys = keyof Order;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {

    approved:           { type: Boolean, required: true },
    user_id:            { type: ObjectID, required: true },
    shipping:           { type: {}, required: true },
    products:           { type: {}, required: true },
    
    payment_type:       { type: String, required: false },
    paypal_order_id:    { type: ObjectID, required: false },
    paypal_order:       { type: {}, required: false },

    discount:           { type: {}, required: false },
    note:               { type: String, required: false },

}



export type OrderDocument = Order & BaseDocument;

export const OrderModel = model<OrderDocument>(
    'orders', 
    new Schema(schema, { timestamps: true, strict: false })
);
