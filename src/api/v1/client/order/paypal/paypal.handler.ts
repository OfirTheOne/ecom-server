import { Controller, Provider } from '@o-galaxy/ether/core';
import { PaypalService } from '../../../../../services/paypal/paypal.service';
import { CartRepository, Cart } from '../../../../../dl/mongodb/cart';
import { OrderRepository, OrderDocument } from '../../../../../dl/mongodb/order';

import { OrdersCreateRequestBody, PurchaseUnit, PurchaseUnitItem } from '@paypal/checkout-server-sdk';
import { ObjectID } from 'mongodb';
import { Product } from '../../../../../dl/mongodb/product';


@Provider()
export class PaypalProvider {

    constructor(
        private paypalService: PaypalService,
        private cartRepository: CartRepository,
        private orderRepository: OrderRepository
    ) {}
    


    public async getClientToken() {
        try {
            return await this.paypalService.createClientToken();
            
        } catch (error) {
            throw error;   
        }
    } 



    public async createOrderIntent(userId: string) {
        try {
            // fetch the user cart
            const cart = await this.cartRepository.getCartByUserId(userId);
            if(!cart || !cart.cart_items || cart.cart_items.length == 0) {
                throw new Error('cart is empty.');
            }
            const orderRequest = this.cartToOrderRequest(cart);
            const createOrderResult =  await this.paypalService.createOrderIntent(orderRequest);
            const orderDoc = await this.orderRepository.createOrderFromCart(userId, cart, {}, 'PAYPAL', createOrderResult.id, orderRequest);
            return createOrderResult;
        } catch (error) {
            throw error;
        }
    }

    public async approveOrder(userId: string, paypalOrderId: string) {

        const result = await this.paypalService.getOrder(paypalOrderId);
        if(result.status == 'APPROVED') {

            const order: OrderDocument = await this.orderRepository.entityModel.updateOne(
                { user_id: new ObjectID(userId), paypal_order_id: paypalOrderId },
                { $set: { approved: true } },
                { nea: true }
            );
            return order?.toObject();
        } else {
            throw new Error('the order was not approved by provider.')
        }
    }

    public cartToOrderRequest(cart: Cart): OrdersCreateRequestBody {

        const currency = 'ILS';
        const description = 'order level description.';
            
        const subtotalPrice = cart.cart_items
            .map<Product>(({product}) => (product as Product))
            .reduce((total, product) => total+product.price, 0 );

        const purchaseUnit: PurchaseUnit = {
            amount: { 
                currency_code: currency, 
                value: `${subtotalPrice}`, 
                breakdown: { item_total: {value : `${subtotalPrice}`, currency_code: currency } } 
            },
            description,
            custom_id: 'order level id',
            items: cart.cart_items
                .map<Product>(({product}) => (product as Product))
                .map<PurchaseUnitItem>(product => ({
                    name: product.name,
                    quantity: '1',
                    sku: product.sku,   
                    unit_amount: {
                        currency_code: product.currency || currency,
                        value: `${product.price}`
                    },
                }))
            // shipping?: object,
        }

        const requestBody: OrdersCreateRequestBody = {
            intent: 'CAPTURE',
            purchase_units: [purchaseUnit]
        };
        return requestBody;
    }
}

