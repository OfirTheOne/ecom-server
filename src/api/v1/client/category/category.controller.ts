import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { CategoryHandler } from './category.handler';

@Controller({ path: '/category' })
export class CategoryController {


    constructor(private categoryHandler: CategoryHandler) { }

    @Get('/:id')
    public async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.categoryHandler.getCategoryById(id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Get()
    public async getAllItems(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.categoryHandler.getAllCategories();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


}