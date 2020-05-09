import { Module } from '@o-galaxy/ether/core';
import { PaypalController } from './paypal/paypal.controller';
import { CartPaymentController } from './card-payment/card-payment.controller';

@Module({

    path: '/order',
    controllers: [
        PaypalController,
        CartPaymentController

    ]
}) 
export class OrderModule { }