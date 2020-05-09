import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { Product } from '../../../../dl/mongodb/product';
import { ProductRepository } from '../../../../dl/mongodb/product/product.repository';
import { CategoryRepository, Category, CategoryDocument } from '../../../../dl/mongodb/category/';
import { SubCategoryRepository, SubCategory, SubCategoryDocument } from '../../../../dl/mongodb/sub-category';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { CsvService } from '../../../../services/csv/csv.service';
import { ObjectID } from 'mongodb';


@Provider()
export class ProductAdminHandler {


    constructor(
        private productRepository: ProductRepository,
        private subCategoryRepository: SubCategoryRepository,
        private categoryRepository: CategoryRepository,
        private inventoryService: InventoryService,
        private csv: CsvService
    ) {}
    
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

    public async getProductById() {

    }

    public async insertProductsParseCsvString(csvString: string) {

        try {
            const categories = await this.categoryRepository.getAllCategories();
    
            const categoriesSet = new Map<string, (CategoryDocument&{sub_categories: SubCategoryDocument[]})>(
                categories.map(cat => [cat.name, cat])
            );
     
            const productsFromCsv = this.csv.parseCsvStringToObject<Product>(csvString);
            const products: Array<Partial<Product>> = productsFromCsv
                .map(Product.parseFromCsv)
                .map(unpopulatedProduct => ({
                    ...unpopulatedProduct, 
                    category: categoriesSet.get(unpopulatedProduct.category)?._id,
                    sub_category: categoriesSet.get(unpopulatedProduct.category)?.sub_categories
                        .find(sub => sub.name == unpopulatedProduct.sub_category)?._id,
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