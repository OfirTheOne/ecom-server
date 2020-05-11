import { ObjectID } from 'mongodb';
import { ApiPermission } from '../api-permission/api-permission';

export interface AdminUser {
    role: string,
    user_id: string,
    email: ObjectID,
    username: number,
    hash: string,
    permissions: Array<ObjectID>|Array<ApiPermission>
    meta: Record<string, string>,

}
