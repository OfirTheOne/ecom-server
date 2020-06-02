import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { LabelEntryRepository, LabelEntry } from '../../../../dl/mongodb/system/label-entry';
import { LabelEnumRepository, LabelEnum, LabelEnumDocument } from '../../../../dl/mongodb/system/label-enum';
import { ObjectID } from 'mongodb';
import { PostAssignLabelBody, PostCreateLabelEnumBody, UpdateLabelEnumBody } from '../../../../scheme-models';
import { BaseHandler } from './../../../../models/base-handler';

@Provider()
export class LabelHandler extends BaseHandler {


    constructor(
        protected labelEntryRepository: LabelEntryRepository,
        protected labelEnumRepository: LabelEnumRepository,
    ) {
        super()
    }
    

    public async getAllLabelEnums() {
        try {
            return (await this.labelEnumRepository.entityModel.find({})).map(d => d.toObject()) as Array<LabelEnum>
        } catch (error) {
            throw error;
        }
    }
    

}