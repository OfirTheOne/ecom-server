import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { CategoryAdminHandler } from './category.admin.handler';
import { CategoryController } from '../../client/category/category.controller';

@Controller({ path: '/category' })
export class CategoryAdminController extends CategoryController {


    constructor(private categoryAdminHandler: CategoryAdminHandler) { 
        super(categoryAdminHandler)
    }

    @Post()
    public async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            const result = await this.categoryAdminHandler.createCategory(data);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }
    /*
    @Get('/:id')
    public async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.categoryAdminHandler.getCategoryById(id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Get()
    public async getAllItems(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.categoryAdminHandler.getAllCategories();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }
    */

}