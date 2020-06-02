import { Controller, Get, Post, Put } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { ProductAdminHandler } from './product.admin.handler';
import { UploadFile, ReadFile } from '../../common/middlewares/file-upload.middleware';
import { Pagination } from '../../common/middlewares/pagination.middleware';

import {ParseFilterProductParams, ParseDiscountProductBody} from './product.admin.middleware';

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

    @ParseDiscountProductBody()
    @Post('/discount')
    public async createProductDiscount(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                sku, item_id, 
                expiry_time,
                percentage_reduction,
                final_price,
                amount_reduction,
            } = req.body;

            const result = await this.productAdminHandler.createProductDiscount(item_id, expiry_time, percentage_reduction, final_price, amount_reduction)
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


    @Put('/:id')
    public async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const {
                sku, 
                name, 
                description,
                price,
                category, 
                sub_category, 
                discount_id,
                percentage_reduction, 
                expiry_time,
                color_options,
                size_options,
                images_url, 
                active,
            } = req.body;

            const result = await this.productAdminHandler.updateProduct(id, {
                sku, 
                name, 
                description,
                price,
                category, 
                sub_category, 
                discount_id,
                percentage_reduction, 
                expiry_time,
                color_options,
                size_options,
                images_url, 
                active,
            });
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


    @ParseFilterProductParams()
    @Pagination(0, 10)
    @Get()
    public async filter(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit, skip, ...options } = req.query
            const result = await this.productAdminHandler.filterProducts(options, Number(skip), Number(limit));
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

    @Get('/:id')
    public async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id; 
            const result = await this.productAdminHandler.getProductById(productId);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }




}