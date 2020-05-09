import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { CategoryAdminHandler } from './category.admin.handler';

@Controller({ path: '/category' })
export class CategoryAdminController {


    constructor(private categoryAdminHandler: CategoryAdminHandler) { }

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


}