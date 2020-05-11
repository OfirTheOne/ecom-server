import * as _ from 'lodash';
import { AdminUserModel, AdminUserDocument } from './admin-user.model';
import { AdminUser } from './admin-user';
import { EntityRepository } from '../../../core/entity-repository';
import { parse } from 'src/utils/parse';
import { ObjectID } from 'mongodb';



export class AdminUserRepository extends EntityRepository<AdminUser, AdminUserDocument> {

    constructor() {
        super(AdminUserModel)
    }
    

    public ingestSafeEntity(data: Partial<AdminUser>) {
        return parse(
            data, 
            {
                role: 'role',
                user_id: 'user_id',
                email: 'email',
                username: 'username',
                hash: 'hash',
                permissions: 'permissions',
                meta: 'meta',

            },
            { applyMapping: ((v) => v!= undefined && v!=null) }
        )
    }

    public projectSafeEntity(entity: AdminUserDocument): Partial<AdminUserDocument> {
        return _.pick(entity, [
           
        ])
    }

}