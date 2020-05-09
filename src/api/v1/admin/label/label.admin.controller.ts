import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { LabelAdminHandler } from './label.admin.handler';

@Controller({ path: '/category' })
export class LabelAdminController {


    constructor(private labelAdminHandler: LabelAdminHandler) { }

    @Get('/all')
    public async getAllLabelEnums(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            const result = await this.labelAdminHandler.getAllLabelEnums();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Post('/create-enum')
    public async createLabelEnum(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            const result = await this.labelAdminHandler.createLabelEnum(data);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Post('/assign')
    public async assignLabel(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            const result = await this.labelAdminHandler.assignLabel(data);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


}