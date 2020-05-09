import * as _ from 'lodash';
import { CategoryModel, CategoryDocument } from './category.model';
import { Category } from './category';
import { EntityRepository } from '../../core/entity-repository';
import { Provider } from '@o-galaxy/ether/core';


@Provider()
export class CategoryRepository extends EntityRepository<Category, CategoryDocument> {

    constructor() {
        super(CategoryModel)
    }
    
    public async getAllCategories() {
        try {
            const categories = await this.entityModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: 'sub-categories',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'sub_categories'
                    }
                }
            ]);
            return categories;
        } catch (error) {
            throw error
        }

    }

    public ingestSafeEntity(data: any) {
        return _.pickBy(
            _.pick(
                data, 
                [
                    'name',
                    'description',
                    'position',
                ]
            ),
            (v) => v!= undefined && v!=null
        )
    }
    public projectSafeEntity(entity: CategoryDocument): Partial<CategoryDocument> {
        return _.pick(entity, [
            'email', 
            'profile_data',
            'notification',
            'recommendation_restriction_alert',
            'finish_onboarding'
        ])
    }

}