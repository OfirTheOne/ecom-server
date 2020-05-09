import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { ProductRepository } from '../../../../dl/mongodb/product/product.repository';
import { InventoryService } from '../../../../services/inventory/inventory.service';
@Provider()
export class ProductHandler {


    constructor(
        private productRepository: ProductRepository,
        private inventoryService: InventoryService
    ) {}
    
    public async filterProducts(
        options: any,
        skip: number, limit: number
    ) {
        const products = await this.productRepository.filterProducts(options, skip, limit);
        const stockAmounts = await this.inventoryService.findStock(products.map(({sku}) => sku))
        const productsWithStock = _.zip(stockAmounts, products).map(([stock, item]) => ({ item, stock }))
        return productsWithStock;
    }

    public async getProductById() {

    }

}