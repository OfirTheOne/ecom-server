import * as _ from 'lodash';
import { DiscountDocument, DiscountModel } from './discount.model';
import { Discount } from './discount';
import { EntityRepository } from '../../../core/entity-repository';
import { parse } from 'src/utils/parse';
import { ObjectID } from 'mongodb';



export class DiscountRepository extends EntityRepository<Discount, DiscountDocument> {

    constructor() {
        super(DiscountModel)
    }
    

    public ingestSafeEntity(data: Partial<Discount>) {
        return parse(
            data, 
            {
                'item_id' : (id) => new ObjectID(id),
                'final_price': Number,
                'percentage_reduction': Number,
                'amount_reduction':  Number,
                'expiry_time': (d) => new Date(d),
            },
            { applyMapping: ((v) => v!= undefined && v!=null) }
        )
    }

    public projectSafeEntity(entity: DiscountDocument): Partial<DiscountDocument> {
        return _.pick(entity, [
           
        ])
    }

}