import * as _ from 'lodash';
import { Provider } from '@o-galaxy/ether/core';
import { LabelEntryRepository, LabelEntry } from '../../../../dl/mongodb/system/label-entry';
import { LabelEnumRepository, LabelEnum, LabelEnumDocument } from '../../../../dl/mongodb/system/label-enum';
import { ObjectID } from 'mongodb';
import { PostAssignLabelBody, PostCreateLabelEnumBody, UpdateLabelEnumBody } from '../../../../scheme-models';
import { LabelHandler } from '../../client/label/label.handler';

@Provider()
export class LabelAdminHandler extends LabelHandler {


    constructor(
        labelEntryRepository: LabelEntryRepository,
        labelEnumRepository: LabelEnumRepository,
    ) {
        super(labelEntryRepository, labelEnumRepository)
        this.isAdmin = true;
    }
    
    /*
    public async getAllLabelEnums() {
        try {
            return (await this.labelEnumRepository.entityModel.find({})).map(d => d.toObject()) as Array<LabelEnum>
        } catch (error) {
            throw error;
        }
    }
    */
    public async createLabelEnum(labelEnum: LabelEnum) {
        try {

            return (await this.labelEnumRepository.create(labelEnum)).toObject()

        } catch (error) {
            throw error;
        }
    }
    public async upsertLabelEnum(labelEnum: UpdateLabelEnumBody) {
        try {

            let labelEnumDoc : LabelEnumDocument;
            if(labelEnum.label_enum_id) {
                labelEnumDoc = await this.labelEnumRepository.entityModel.findById(labelEnum.label_enum_id)
                labelEnumDoc.display_label_key = labelEnum.display_label_key;
                labelEnumDoc.label_key = labelEnum.label_key;
            } else {
                labelEnumDoc = new this.labelEnumRepository.entityModel({ 
                    label_key: labelEnum.label_key,
                    display_label_key: labelEnum.display_label_key
                });
            }

            const valueMap = new Map(labelEnumDoc.label_values.map(({name, _id}, i) => ([_id.toHexString(), {name, i}])))

            for(let labelValue of labelEnum.label_values) {
                if(labelValue.label_value_id && valueMap.has(labelValue.label_value_id.toHexString())) {
                    const { name, i } = valueMap.get(labelValue.label_value_id.toHexString());
                    labelEnumDoc.label_values[i].name = labelValue.name;
                } else {
                    labelEnumDoc.label_values.push({name: labelValue.name});
                }
            }
            const updatedEnumLabel = await labelEnumDoc.save();
            return updatedEnumLabel;
            
            // return (await this.labelEnumRepository.create(labelEnum)).toObject()

        } catch (error) {
            throw error;
        }
    }


    public async assignLabels(data: PostAssignLabelBody) {
        try {

            let { labels } = data;

            const result = await Promise.all(labels.map(label => this.assignSingleLabel(label)))
            return result;

            // return await this.labelEntryRepository.create({ item_id, label_value: labelValue._id, label_key: labelEnum._id });
        } catch (error) {
            throw error;
        }
    }
    public async assignSingleLabel(data: PostAssignLabelBody['labels'][number]) {
        try {

            let { label_value, label_key, item_id } = data;
            const labelEnum = await this.labelEnumRepository.entityModel.findOne({ _id: label_key });

            if(!labelEnum) { throw Error('cant find label enum.') }
            const labelValue = labelEnum.label_values.find(({name, _id}) => _id.toHexString() == label_value.toHexString());

            if(!labelValue) { throw Error('cant find label value.') }
            return await this.labelEntryRepository.entityModel.findOneAndUpdate(
                { item_id } , 
                { label_value: labelValue._id, label_key: labelEnum._id },
                { upsert: true, new: true}
            );

            // return await this.labelEntryRepository.create({ item_id, label_value: labelValue._id, label_key: labelEnum._id });
        } catch (error) {
            throw error;
        }
    }

    

}