import { Controller, Get } from '@o-galaxy/ether/core';
import { CartPaymentProvider } from './card-payment.handler';
import { Request, Response ,NextFunction } from 'express';



@Controller({ path: '/c-payment', })
export class CartPaymentController {

    constructor(private cartPaymentProvider: CartPaymentProvider ) {}

    public async getPaypalClientToken(req: Request, res: Response, next: NextFunction)  {
        try {
            return res.send();
        } catch (error) {
            return next(error);
        }
    }

    public createOrderIntent(req: Request, res: Response, next: NextFunction) {
        
    }
    
}

