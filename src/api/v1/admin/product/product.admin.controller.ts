import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { ProductAdminHandler } from './product.admin.handler';
import { UploadFile, ReadFile } from '../../common/middlewares/file-upload.middleware';

@Controller({ path: '/product' })
export class ProductAdminController {


    constructor(
        private productAdminHandler: ProductAdminHandler,
    ) { }

    @Post()
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                sku, item_index ,name, description,
                note, active, price, currency,
                color_options, color_price_factor,
                size_options, size_price_factor,
                category, sub_category, images_url, 
                meta
            } = req.body;

            const result = await this.productAdminHandler.createProduct({
                sku, item_index, name, description,
                note, active, price, currency,
                color_options, color_price_factor,
                size_options, size_price_factor,
                category, sub_category, images_url,
                meta
            });
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


    @ReadFile('product_table_buffer')
    @UploadFile('product_table')
    @Post('/upload/csv')
    public async bulkUploadWithCsv(req: Request, res: Response, next: NextFunction) {
        try {
            const productTableFile = res.locals.product_table_buffer;
            const productTable = productTableFile?.toString('utf8');
            const result = await this.productAdminHandler.insertProductsParseCsvString(productTable)
            return res.send(result);
        } catch (error) {
            return next(error)
        }
    }

}