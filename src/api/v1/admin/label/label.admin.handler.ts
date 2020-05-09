import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { LabelEntryRepository, LabelEntry } from '../../../../dl/mongodb/system/label-entry';
import { LabelEnumRepository, LabelEnum } from '../../../../dl/mongodb/system/label-enum';
import { ObjectID } from 'mongodb';

@Provider()
export class LabelAdminHandler {


    constructor(
        private labelEntryRepository: LabelEntryRepository,
        private labelEnumRepository: LabelEnumRepository,
    ) {}
    

    public async getAllLabelEnums() {
        try {
            return (await this.labelEnumRepository.entityModel.find({})).map(d => d.toObject()) as Array<LabelEnum>
        } catch (error) {
            throw error;
        }
    }
    public async createLabelEnum(labelEnum: LabelEnum) {
        try {
            return (await this.labelEnumRepository.create(labelEnum)).toObject()

        } catch (error) {
            throw error;
        }
    }
    public async assignLabel(data: LabelEntry) {
        try {
            let label_key_id: ObjectID;
            let label_value_id: ObjectID;

            let { label_value, label_key, item_id } = data
            const labelEnum = await this.labelEnumRepository.entityModel.findOne({ label_key });
            const value = labelEnum.label_values.find(({name}) => name == label_value);

            item_id = new ObjectID(item_id);
            label_value_id = value['_id'];
            label_key_id = labelEnum._id

            return await this.labelEntryRepository.create({ item_id, label_value_id, label_key_id })
        } catch (error) {
            throw error;
        }
    }

    

}