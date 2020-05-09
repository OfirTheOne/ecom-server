import { ObjectID } from 'mongodb';
import { Product } from '../product';

export interface Order {

    approved: boolean;

    user_id: ObjectID,
    shipping: any,
    products: Array<Product>
    
    payment_type?: 'PAYPAL'|'CARD',
    paypal_order_id?: string,
    paypal_order?: any,

    discount?: any
    note?: string
}


// toModel<Order, typeof Order>(Order, 'users');
