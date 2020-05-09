import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { SubCategoryAdminHandler } from './sub-category.admin.handler';

@Controller({ path: '/sub-category' })
export class SubCategoryAdminController {


    constructor(private subCategoryAdminHandler: SubCategoryAdminHandler) { }

    @Post()
    public async createSubCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                name, description, category_id, position
            } = req.body;

            const result = await this.subCategoryAdminHandler.createSubCategory({
                name, description, position
            }, category_id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


}