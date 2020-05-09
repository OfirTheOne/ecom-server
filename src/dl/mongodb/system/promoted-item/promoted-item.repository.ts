import * as _ from 'lodash';
import { PromotedItemDocument, PromotedItemModel } from './promoted-item.model';
import { PromotedItem } from './promoted-item';
import { EntityRepository } from '../../../core/entity-repository';



export class PromotedItemRepository extends EntityRepository<PromotedItem, PromotedItemDocument> {

    constructor() {
        super(PromotedItemModel)
    }
    


    public ingestSafeEntity(data: any) {
        
        let cleanData = _.pickBy(
            _.pick(
                data, 
                [
                    'item_id',
                    'item_type',
                    'weight',
                    'note',
                ]
            ),
            (v) => v!= undefined && v!=null
        );
        return cleanData;
    }
    public projectSafeEntity(entity: PromotedItemDocument): Partial<PromotedItemDocument> {
        return _.pick(entity, [
           
        ])
    }

}