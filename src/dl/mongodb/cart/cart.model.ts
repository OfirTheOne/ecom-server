import { Cart, CartItem } from './cart';
import { SchemaDefinition, Document, model, Schema } from 'mongoose';
import { Dictionary } from 'ts-essentials';
import { BaseDocument } from './../../core/base-document'
import { ObjectID } from 'mongodb';




type CartItemSchemaKeys = keyof CartItem;

const cartItemSchema: Dictionary<any, CartItemSchemaKeys>&SchemaDefinition  = {
    product: ObjectID, 
    selected_options: { type: [{key: String, value: String}], default: [] },
    // price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}


type SchemaKeys = keyof Cart;

const schema: Dictionary<any, SchemaKeys>&SchemaDefinition  = {
    user: { type: ObjectID, required: true },

    cart_items: { 
        type: [cartItemSchema], 
        default: [] 
    },
}



export type CartDocument = Cart & BaseDocument;

export const CartModel = model<CartDocument>(
    'carts', 
    new Schema(schema, { timestamps: true, strict: false })
);
