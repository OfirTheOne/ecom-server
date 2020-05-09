import { Module } from '@o-galaxy/ether/core';
import { CartController } from './cart.controller'

@Module({

    controllers: [
        CartController
    ]
}) 
export class CartModule { }