import { Controller, Get } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { ProductHandler } from './product.handler';
import { Pagination } from '../../common/middlewares/pagination.middleware';

@Controller()
export class ProductController {


    constructor(private productHandler: ProductHandler) {}

    @Pagination(0, 10)
    @Get()
    public async filter(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit, skip, ...options } = req.query
            const result = await this.productHandler.filterProducts(options, Number(skip), Number(limit));
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Get('/:id')
    public async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }



}