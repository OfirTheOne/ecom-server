import * as _ from 'lodash';
import { OrderModel, OrderDocument } from './order.model';
import { Order } from './order';
import { EntityRepository } from '../../core/entity-repository';
import { Cart } from '../cart';
import { ObjectID } from 'mongodb';
import { Provider } from '@o-galaxy/ether/core';

import { parse } from '../../../utils/parse'
import { Product } from '../product';

@Provider()
export class OrderRepository extends EntityRepository<Order, OrderDocument> {

    constructor() {
        super(OrderModel)
    }
    

    public async createOrderFromCart(
        userId: string, 
        cart: Cart, 
        shipping: any,  
        payment_type?: 'PAYPAL'|'CARD', 
        paypal_order_id?: string, 
        paypal_order?: any
    ) {

        const order: Order = {
            approved: false,
            user_id: new ObjectID(userId),
            products: cart.cart_items.map(({product}) => product as Product),
            shipping,
            payment_type,
            paypal_order_id,
            paypal_order
        };

        return await this.create(order)
    }

    public ingestSafeEntity(data: Order) {

        const cleanData = parse(
            data, 
            {
                approved: 'approved',
                user_id: 'user_id',
                products: 'products',
                shipping: 'shipping'
            },
            { applyMapping: ((v) => v!= undefined && v!=null) }
        );
        return cleanData;
       
    }

    public projectSafeEntity(entity: OrderDocument): Partial<OrderDocument> {
        return _.pick(entity, [
            'email', 
            'profile_data',
            'notification',
            'recommendation_restriction_alert',
            'finish_onboarding'
        ])
    }

}