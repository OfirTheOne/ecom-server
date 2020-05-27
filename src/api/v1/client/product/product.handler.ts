import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { ProductRepository } from '../../../../dl/mongodb/product/product.repository';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { BaseHandler } from '../../../../models/base-handler';


@Provider()
export class ProductHandler extends BaseHandler {


    constructor(
        protected productRepository: ProductRepository,
        protected inventoryService: InventoryService
    ) {
        super();
    }
    

    public async filterProducts(
        options: any,
        skip: number, limit: number, flatResult: boolean = false
    ) {
        try {
            const { items, ...pagination} = await this.productRepository.filterProducts(options, skip, limit, flatResult, this._isAdmin);
            const stockAmounts = await this.inventoryService.findStock(items.map(({sku}) => sku))
            const productsWithStock = _.zip(stockAmounts, items).map(([stock, item]) => ({ item, stock }))
            return { items: productsWithStock, ...pagination };
            
        } catch (error) {
            throw error;
        }
    }

    public async getProductById(id: string) {
        try {
            return await this.productRepository.findProductsById(id, false, true);
        } catch (error) {
            throw error;
        }
    }

}