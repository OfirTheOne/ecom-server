import { Controller, Get, Post, Delete, Put } from '@o-galaxy/ether/core';
import { Request, Response ,NextFunction } from 'express';
import { CartProvider } from './cart.handler';
import { FetchLocalUserByUid } from '../../common/middlewares/fetch-local-user-by-uid.middleware';



@Controller({ path: '/cart', })
export class CartController {

    constructor(
        private cartProvider: CartProvider
    ) {}

    @FetchLocalUserByUid()
    @Get('/all') 
    public async getCart(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId } = res.locals;
            const result = await this.cartProvider.getCart(userId);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }  

    @FetchLocalUserByUid()
    @Post('/add')
    public async addItemToCart(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId } = res.locals;
            const { product, selected_options, quantity } = req.body;
            const result = await this.cartProvider.addItem(userId, { product, selected_options, quantity });
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @FetchLocalUserByUid()
    @Put()
    public async updateItemInCart(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId } = res.locals;
            const { product, selected_options, quantity, item_id } = req.body;
            const result = await this.cartProvider.updateItem(userId, item_id, { product, selected_options, quantity });
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @FetchLocalUserByUid()
    @Delete('/remove')
    public async removeItemFromCart(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId } = res.locals;
            const { item_id } = req.body;
            const result = await this.cartProvider.removeItem(userId, item_id);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    @FetchLocalUserByUid()
    @Delete('/empty')
    public async emptyCart(req: Request, res: Response, next: NextFunction)  {
        try {
            const { uid, userId } = res.locals;
            const result = await this.cartProvider.emptyCart(userId);
            return res.send(result);
        } catch (error) {
            return next(error);
        }
    }

    
}

