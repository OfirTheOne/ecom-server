import * as _ from 'lodash';
import { LabelEntryDocument, LabelEntryModel } from './label-entry.model';
import { LabelEntry } from './label-entry';
import { EntityRepository } from '../../../core/entity-repository';



export class LabelEntryRepository extends EntityRepository<LabelEntry, LabelEntryDocument> {

    constructor() {
        super(LabelEntryModel)
    }
    

    public ingestSafeEntity(data: any) {
        return _.pickBy(
            _.pick(
                data, 
                [
                    'item_id',
                    // 'label_key',
                    'label_key',
                    // 'label_value',
                    'label_value',
                ]
            ),
            (v) => v!= undefined && v!=null
        )
    }
    public projectSafeEntity(entity: LabelEntryDocument): Partial<LabelEntryDocument> {
        return _.pick(entity, [
           
        ])
    }

}