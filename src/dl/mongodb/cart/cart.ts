import { Product } from '../product';
import { User } from '../user';
import { ArrayType } from 'general-types';


export interface CartItem {
    product: Product | string, 
    selected_options: Array<{key: string, value: any}>,
    // price: number,
    quantity: number
}


export interface Cart {

    user: User,
    cart_items: Array<CartItem>
}


// toModel<Cart, typeof Cart>(Cart, 'users');
