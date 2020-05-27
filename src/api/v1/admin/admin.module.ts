

import { Module } from '@o-galaxy/ether/core';
import { SubCategoryAdminController } from './sub-category/sub-category.admin.controller';
import { CategoryAdminController } from './category/category.admin.controller';
import { ProductAdminController } from './product/product.admin.controller';
import { LabelAdminController } from './label/label.admin.controller';

;

@Module({

    path: '/admin',
    controllers: [
        LabelAdminController,
        SubCategoryAdminController,
        CategoryAdminController,
        ProductAdminController
    ]
}) 
export class AdminModule { }