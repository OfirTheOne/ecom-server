import { Controller, Get, Post, Put } from '@o-galaxy/ether/core';
import { Request, Response, NextFunction } from 'express';
import { LabelHandler } from './label.handler';
import { construct } from '@o-galaxy/scheme-construct/core';
import { PostAssignLabelBody, PostCreateLabelEnumBody, UpdateLabelEnumBody } from '../../../../scheme-models';

@Controller({ path: '/label' })
export class LabelController {


    constructor(private labelHandler: LabelHandler) { }

    @Get('/enum/all')
    public async getAllLabelEnums(req: Request<any>, res: Response, next: NextFunction) {
        try {

            const result = await this.labelHandler.getAllLabelEnums();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

}