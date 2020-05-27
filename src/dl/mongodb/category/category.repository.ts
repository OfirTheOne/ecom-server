import * as _ from 'lodash';
import { CategoryModel, CategoryDocument } from './category.model';
import { Category } from './category';
import { EntityRepository } from '../../core/entity-repository';
import { Provider } from '@o-galaxy/ether/core';
import { ObjectID } from 'mongodb';


@Provider()
export class CategoryRepository extends EntityRepository<Category, CategoryDocument> {

    constructor() {
        super(CategoryModel)
    }
    
    public async getAllItems(): Promise<Array<CategoryDocument>> {
        try {
            let pipelines = [
                { $match: {} },
                {
                    $lookup: {
                        from: 'sub-categories',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'sub_categories'
                    }
                }
            ];
            pipelines = pipelines.filter( pipe => pipe != undefined);
            const queryResult = await this.entityModel.aggregate(pipelines);
            if(!(queryResult?.length > 0)) {
                // throw Error
            } else {
    
                return  queryResult;//.map(c => this.projectSafeEntity(c)),
            }    
        } catch (error) {
            throw error
        }

    }

    public async getItemById(id: string): Promise<CategoryDocument>  {
        try {
                
            let pipelines = [
                { $match: { _id: new ObjectID(id)} },
                {
                    $lookup: {
                        from: 'sub-categories',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'sub_categories'
                    }
                }
            ];
            pipelines = pipelines.filter( pipe => pipe != undefined);
            const queryResult = await this.entityModel.aggregate(pipelines);
            if(!(queryResult?.length > 0)) {
                // throw Error
            } else {
    
                return queryResult[0]// this.projectSafeEntity(queryResult[0])
            }    
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