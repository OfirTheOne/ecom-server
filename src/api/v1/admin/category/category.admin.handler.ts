import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { CategoryRepository } from '../../../../dl/mongodb/category/category.repository';
import { Category } from '../../../../dl/mongodb/category';
import { CategoryHandler } from '../../client/category/category.handler';
@Provider()
export class CategoryAdminHandler extends CategoryHandler {


    constructor(
        categoryRepository: CategoryRepository,
    ) {
        super(categoryRepository);
        this.isAdmin = true;
    }
    
    public async createCategory(category: Category) {
        try {
            return await this.categoryRepository.create(category);
            
        } catch (error) {
            throw error;
        }
    }


}