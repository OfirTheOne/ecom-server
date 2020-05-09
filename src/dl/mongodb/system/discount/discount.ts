import { ObjectID } from 'mongodb';

export interface Discount {
    item_id: ObjectID,
    final_price?: number,
    percentage_reduction? : number,
    amount_reduction?: number
    expiry_time: Date
}