import * as _ from 'lodash';
import { SubCategoryModel, SubCategoryDocument } from './sub-category.model'
import { EntityRepository } from '../../core/entity-repository';
import { SubCategory } from './sub-category';



export class SubCategoryRepository extends EntityRepository<SubCategory, SubCategoryDocument> {
    

    constructor() {
        super(SubCategoryModel)
    }
    

    public ingestSafeEntity(data: any) {
        return _.pickBy(
            _.pick(
                data, 
                [
                    'name',
                    'description',
                    'position',
                    'category'
                ]
            ),
            (v) => v!= undefined && v!=null
        )
    }

    public projectSafeEntity(entity: SubCategoryDocument): Partial<SubCategoryDocument> {
        return _.pick(entity, [
            'email', 
            'profile_data',
            'notification',
            'recommendation_restriction_alert',
            'finish_onboarding'
        ])
    }

}