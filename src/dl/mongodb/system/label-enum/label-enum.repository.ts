import * as _ from 'lodash';
import { LabelEnumDocument, LabelEnumModel } from './label-enum.model';
import { LabelEnum } from './label-enum';
import { EntityRepository } from '../../../core/entity-repository';



export class LabelEnumRepository extends EntityRepository<LabelEnum, LabelEnumDocument> {

    constructor() {
        super(LabelEnumModel)
    }
    


    public ingestSafeEntity(data: any) {
        
        let cleanData = _.pickBy(
            _.pick(
                data, 
                [
                    'display_label_key',
                    'label_key',
                    'label_values',
                ]
            ),
            (v) => v!= undefined && v!=null
        );

        cleanData.label_values  = (cleanData.label_values as LabelEnum['label_values']||[]).map(({name}) => ({name})) ;
        return cleanData;
    }
    public projectSafeEntity(entity: LabelEnumDocument): Partial<LabelEnumDocument> {
        return _.pick(entity, [
           
        ])
    }

}