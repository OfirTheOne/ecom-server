import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { Product } from '../../../../dl/mongodb/product';
import { ProductRepository } from '../../../../dl/mongodb/product/product.repository';
import { CategoryRepository, Category, CategoryDocument } from '../../../../dl/mongodb/category/';
import { SubCategoryRepository, SubCategory, SubCategoryDocument } from '../../../../dl/mongodb/sub-category';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { CsvService } from '../../../../services/csv/csv.service';
import { ObjectID } from 'mongodb';
import { ProductHandler } from '../../client/product/product.handler';
import { DiscountRepository } from '../../../../dl/mongodb/system/discount';
import { PutUpdateProductParams } from '../../../../models/update-product-params';


@Provider()
export class ProductAdminHandler extends ProductHandler {


    constructor(
        productRepository: ProductRepository,
        inventoryService: InventoryService,
        private subCategoryRepository: SubCategoryRepository,
        private categoryRepository: CategoryRepository,
        private discountRepository: DiscountRepository,
        private csv: CsvService
    ) {
        super(
            productRepository, 
            inventoryService
        );
        this.isAdmin = true;
    }
    
    public async createProduct(product: Product) {
        try {
            const subCategoryId = new ObjectID(`${product.sub_category}`) 
            const subCategory = await this.subCategoryRepository.entityModel.findById(subCategoryId)
            product.sub_category = subCategory._id as any;
            product.category = subCategory.category as any;

            return await this.productRepository.create(product);
            
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(productId: string, params: PutUpdateProductParams) {

        try {
            const { discount_id, percentage_reduction, expiry_time, ...updateProductParams } = params;
            if(percentage_reduction || expiry_time) {
                const updatedDiscount = await this.discountRepository.createOrUpdateDiscountByItemId( 
                    { 
                        item_id: (productId as any), 
                        percentage_reduction, 
                        expiry_time: (expiry_time as any)
                    }
                );
            }
            const updateResult = await this.productRepository.updateProduct(productId, updateProductParams, this.isAdmin)
            return updateResult;
        } catch (error) {
            throw error;
        }
    }

    public async createProductDiscount(itemId: ObjectID, expiryTime: Date, percentageReduction: number, finalPrice: number, amountReduction: number) {
        try {


            const discount = await this.discountRepository.create({
                item_id: itemId,
                expiry_time: expiryTime,
                percentage_reduction: percentageReduction,
                // final_price: finalPrice,
                // amount_reduction: amountReduction
            })
            return discount;
            
        } catch (error) {
            throw error;
        }
    }


    public async insertProductsParseCsvString(csvString: string) {

        try {
            const categories = await this.categoryRepository.getAllItems();
    
            const categoriesSet = new Map<string, (CategoryDocument /*&{sub_categories: SubCategoryDocument[]}*/ )>(
                categories.map(cat => [cat.name, cat])
            );
     
            const productsFromCsv = this.csv.parseCsvStringToObject<Product>(csvString);
            const products: Array<Partial<Product>> = productsFromCsv
                .map(Product.parseFromCsv)
                .map(unpopulatedProduct => ({
                    ...unpopulatedProduct, 
                    category: categoriesSet.get(unpopulatedProduct.category)?._id,
                    sub_category: categoriesSet.get(unpopulatedProduct.category)?.sub_categories
                        .find((sub: SubCategoryDocument) => sub.name == unpopulatedProduct.sub_category)?._id,
                }))
    
            const insertResult = await this.productRepository.entityModel.insertMany(
                products, 
                { rawResult: true }
            );
    
            return insertResult;
            
        } catch (error) {
            throw error;
        }
        
    }

}