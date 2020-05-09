import * as _ from 'lodash';
import { EntityRepository } from '../../core/entity-repository';
import { CartModel, CartDocument } from './cart.model'
import { Cart, CartItem } from './cart';
import { ObjectID, ObjectId } from 'mongodb';
import { Provider } from '@o-galaxy/ether/core';
import { ProductModel } from '../product';
import { parse } from '../../../utils';


@Provider()
export class CartRepository extends EntityRepository<Cart, CartDocument> {
    

    constructor() {
        super(CartModel);
    }

    public async removeItems(userId: string, itemIds: Array<string>): Promise<CartDocument> {
        try {
            const cart = await this.entityModel.updateOne(
                {
                    user: userId as any
                },
                {
                    $pull: { 'cart_items._id': { $in: [ itemIds.map(id => new ObjectID(id)) ] } } 
                },
                { new: true}
            );
            return cart;
            
        } catch (error) {
            throw error;
        }
    }

    public async addItem(userId: string, item: CartItem): Promise<CartDocument> {
        try {

            const cart = await this.entityModel.updateOne(
                {
                    user: new ObjectID(userId) as any
                },
                {
                    $push: { 'cart_items': {...item, product: new ObjectID(`${item.product}`)} as any} 
                },
                { upsert: true, new: true}
            );
            return cart;
            
        } catch (error) {
            throw error;
        }
    }


    public async updateItem(userId: string, itemId: string, item: CartItem): Promise<CartDocument> {
        try {

            const cleanItem = parse(
                item, 
                {
                    product: (p: any ) => new ObjectId(p),
                    selected_options: (ops) => ops.map(({key, value}) => ({key, value})),
                    quantity: (q => Number(q))
                },
                { applyMapping: ((v) => v != undefined && v != null) }
            );

            const updateItemQueryObject = parse(
                cleanItem, 
                {
                    product: 'cart_items.$.product',
                    quantity: 'cart_items.$.quantity',
                    selected_options: 'cart_items.$.selected_options',
                },
                { applyMapping: ((v) => v != undefined && v != null) }

            )
            const cart = await this.entityModel.findOneAndUpdate(
                {
                    user: new ObjectID(userId) as any,
                    'cart_items._id': new ObjectID(itemId) as any,
                },
                { $set: updateItemQueryObject },
                { new: true }
            );
            return cart;
            
        } catch (error) {
            throw error;
        }
    }

    public async emptyCart(userId: string): Promise<CartDocument> {
        try {

            const cart = await this.entityModel.updateOne(
                {
                    user: new ObjectID(userId) as any
                },
                {
                    $set: { 'cart_items': [] } 
                },
                { upsert: true, new: true}
            );
            return cart;
            
        } catch (error) {
            throw error;
        }
    }


    public async getCartByUserId(userId: string): Promise<CartDocument> {

        let pipelines = [
            {
                $match: { user: new ObjectID(userId) }
            },
            {
                $unwind: "$cart_items" 
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: 'cart_items.product',
                    foreignField: '_id',
                    as:  'cart_items.product'
                }
            },
            {
                $unwind: "$cart_items.product" 
            },
            {
                $group: { 
                    _id: null,
                    cart_items: { $push: { "item" : '$cart_items' } }
                }
            }
        ];

        let result: any = await this.entityModel.aggregate(pipelines);
        if(!result?.length || !result[0].cart_items) {
            // user have no cart
        } 
        result = {
            // ...result,
            cart_items: result[0]?.cart_items,
        }
        return result;
    }



    public ingestSafeEntity(data: any) {
        return {} as any;
    }
    
    public projectSafeEntity(entity: CartDocument): Partial<CartDocument> {
        const safeProjection =  parse(entity, {
            cart_items: (items => items.map(item => ({...item, item_id: item['_id'], _id: undefined}))) 
        })

        return safeProjection;
    }

}