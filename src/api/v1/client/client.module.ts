import { Module } from '@o-galaxy/ether/core';
import { LogisterModule } from './logister/logister.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { FirebaseAuthTokenGuard } from '../common/guards/firebase-auth-token.guard';


@Module({
    path: '/v1',
    guards: [
        FirebaseAuthTokenGuard
    ],
    modules: [
        LogisterModule,
        ProductModule,
        CartModule,
        OrderModule,
    ]
}) 
export class ClientModule { }