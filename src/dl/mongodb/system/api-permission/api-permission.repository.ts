import * as _ from 'lodash';
import { ApiPermissionDocument, ApiPermissionModel } from './api-permission.model';
import { ApiPermission } from './api-permission';
import { EntityRepository } from '../../../core/entity-repository';
import { parse } from 'src/utils/parse';
import { ObjectID } from 'mongodb';



export class ApiPermissionRepository extends EntityRepository<ApiPermission, ApiPermissionDocument> {

    constructor() {
        super(ApiPermissionModel)
    }
    

    public ingestSafeEntity(data: Partial<ApiPermission>) {
        return parse(
            data, 
            {
                'api_endpoints' : 'api_endpoints',
                'identifier': 'identifier',
                'descriptions': 'descriptions',
            },
            { applyMapping: ((v) => v!= undefined && v!=null) }
        )
    }

    public projectSafeEntity(entity: ApiPermissionDocument): Partial<ApiPermissionDocument> {
        return _.pick(entity, [
           
        ])
    }

}