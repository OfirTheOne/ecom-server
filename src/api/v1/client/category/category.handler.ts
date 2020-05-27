import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { CategoryRepository } from '../../../../dl/mongodb/category/category.repository';
import { Category } from '../../../../dl/mongodb/category';
import { BaseHandler } from '../../../../models/base-handler';

@Provider()
export class CategoryHandler extends BaseHandler {


    constructor(
        protected categoryRepository: CategoryRepository,
    ) {
        super();
    }
    
    public async getAllCategories() {
        try {
            return await this.categoryRepository.getAllItems();
            
        } catch (error) {
            throw error;
        }
    }

    public async getCategoryById(id: string) {
        try {
            return await this.categoryRepository.getItemById(id);
            
        } catch (error) {
            throw error;
        }
    }

}