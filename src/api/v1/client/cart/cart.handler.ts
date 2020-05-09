import { Controller, Provider } from '@o-galaxy/ether/core';
import { CartRepository } from '../../../../dl/mongodb/cart/cart.repository';
import { ProductRepository } from '../../../../dl/mongodb/product/product.repository';
import { Cart, CartItem } from '../../../../dl/mongodb/cart/cart';
import { ObjectID } from 'mongodb';


@Provider()
export class CartProvider {

    constructor(
        private cartRepository: CartRepository,
        private productRepository: ProductRepository) {}
    


    public async removeItem(userId: string, itemId: string) {
        try {
            return await this.cartRepository.removeItems(userId, [itemId]);
            
        } catch (error) {
            throw error;   
        }
    } 

    public async addItem(userId: string, item: CartItem) {// product_id: string, options_list: CartItem['selected_options'], quantity: number ) {
        try {
            try {
                const product = await this.productRepository.entityModel.findById(new ObjectID((`${item.product}` as string)))
                if(!product) {
                    throw Error('product not exists.');
                }
                const cart = await this.cartRepository.addItem(userId, {
                    product: product._id as any,
                    selected_options: item.selected_options,
                    quantity : item.quantity || 1

                });
                return this.cartRepository.projectSafeEntity(cart);

            } catch (error) {
                throw error;
            }
            
        } catch (error) {
            throw error;   
        }
    } 


    public async updateItem(userId: string, ItemId: string, item: CartItem ) {
        try {
            try {

                const cart = await this.cartRepository.updateItem(userId, ItemId, item);
                return this.cartRepository.projectSafeEntity(cart);
            } catch (error) {
                throw error;
            }
            
        } catch (error) {
            throw error;   
        }
    } 


    public async getCart(userId: string) {
        try {
            const cart =  await this.cartRepository.getCartByUserId(userId);
            return this.cartRepository.projectSafeEntity(cart);            
        } catch (error) {
            throw error;   
        }
    } 

    public async emptyCart(userId: string) {
        try {
            return await this.cartRepository.emptyCart(userId);
            
        } catch (error) {
            throw error;   
        }
    } 




}

