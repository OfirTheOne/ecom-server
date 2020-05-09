import { Controller, Get, Post } from '@o-galaxy/ether/core';
import { PaypalProvider } from './paypal.handler';
import { Request, Response ,NextFunction } from 'express';

import { FetchLocalUserByUid } from '../../../common/middlewares/fetch-local-user-by-uid.middleware';


@Controller({ path: '/paypal', })
export class PaypalController {

    constructor(
        private paypalProvider: PaypalProvider
    ) {}

    @Get('/ctoken')
    public async getPaypalClientToken(req: Request, res: Response, next: NextFunction)  {
        try {
            const result = await this.paypalProvider.getClientToken();
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @FetchLocalUserByUid()
    @Get('/create-order-intent') 
    public async getPaypalOrderCreate(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId  } = res.locals;
            const result = await this.paypalProvider.createOrderIntent(userId);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }  
    
    @FetchLocalUserByUid()
    @Post('/approve-order') 
    public async postPaypalOrderApproved(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId  } = res.locals;
            const {paypal_order_id} = req.body;
            const result = await this.paypalProvider.approveOrder(userId, paypal_order_id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }  
    


}

