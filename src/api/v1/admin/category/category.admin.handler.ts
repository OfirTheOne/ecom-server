import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { CategoryRepository } from '../../../../dl/mongodb/category/category.repository';
import { Category } from '../../../../dl/mongodb/category';
@Provider()
export class CategoryAdminHandler {


    constructor(
        private categoryRepository: CategoryRepository,
    ) {}
    
    public async createCategory(category: Category) {
        try {
            return await this.categoryRepository.create(category);
            
        } catch (error) {
            throw error;
        }
    }

    public async getProductById() {

    }

}