import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { SubCategory, SubCategoryRepository } from '../../../../dl/mongodb/sub-category';
import { ObjectID } from 'mongodb';
@Provider()
export class SubCategoryAdminHandler {


    constructor(
        private subCategoryRepository: SubCategoryRepository,
    ) {}
    
    public async createSubCategory(subCategory: Partial<SubCategory>, categoryId: string) {
        try {

            subCategory.category = new ObjectID(categoryId) as any;
            return await this.subCategoryRepository.create(subCategory);
            
        } catch (error) {
            throw error;
        }
    }

    public async getProductById() {

    }

}