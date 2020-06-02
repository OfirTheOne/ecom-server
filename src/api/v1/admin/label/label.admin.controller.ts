import { Controller, Get, Post, Put } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { LabelAdminHandler } from './label.admin.handler';
import { construct } from '@o-galaxy/scheme-construct/core';
import { PostAssignLabelBody, PostCreateLabelEnumBody, UpdateLabelEnumBody } from '../../../../scheme-models';
import { LabelController } from '../../client/label/label.controller';

@Controller({ path: '/label' })
export class LabelAdminController extends LabelController {


    constructor(private labelAdminHandler: LabelAdminHandler) { 
        super(labelAdminHandler)
    }

    /*
    @Get('/enum/all')
    public async getAllLabelEnums(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            const result = await this.labelAdminHandler.getAllLabelEnums();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }
    */
    
    @Post('/enum')
    public async createLabelEnum(req: Request, res: Response, next: NextFunction) {
        try {
            const data = construct(PostCreateLabelEnumBody, req.body);

            if(data.errors.length > 0) {
                return next({message: data.errors});
            }
            const result = await this.labelAdminHandler.createLabelEnum(data.value);
            
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Put('/enum')
    public async updateLabelEnum(req: Request, res: Response, next: NextFunction) {
        try {
            const data = construct(UpdateLabelEnumBody, req.body);

            if(data.errors.length > 0) {
                return next({message: data.errors});
            }
            const result = await this.labelAdminHandler.upsertLabelEnum(data.value);
            
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @Post('/assign')
    public async assignLabel(req: Request, res: Response, next: NextFunction) {
        try {

            const data = construct(PostAssignLabelBody, req.body);

            if(data.errors.length > 0) {
                return next(data.errors);
            }
            const result = await this.labelAdminHandler.assignLabels(data.value);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }


}