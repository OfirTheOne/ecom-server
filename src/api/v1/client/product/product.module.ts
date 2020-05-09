import { Module } from '@o-galaxy/ether/core';
import { ProductController } from './product.controller'

@Module({

    path: '/product',
    controllers: [
        ProductController
    ]
}) 
export class ProductModule { }