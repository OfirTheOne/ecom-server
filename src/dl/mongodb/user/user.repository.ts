import * as _ from 'lodash';
import { UserModel, UserDocument } from './user.model'
import { EntityRepository } from '../../core/entity-repository';
import { User } from './user';



export class UserRepository extends EntityRepository<User, UserDocument> {
    
    constructor() {
        super(UserModel);
    }   

    public async getUserByUid(uid: string) {
        try {
            const user = await this.entityModel.findOne({ uid });
            return user;
            
        } catch (error) {
            throw error;
        }
    }
    public ingestSafeEntity(data: any) {
        return {} as any;
    }

    public async loginUser(uid: string, email: string, payload: any ) {
		try {
			const user = await this.entityModel.findOneAndUpdate(
				{ "email": email }, 
				{ $addToSet: { uid } }, 
				{ upsert: true, new: true }
			);


			return this.projectSafeEntity(user);
			
		} catch (error) {
			throw error;
		}
    }
    
    public async loginAnonUser(uid: string) {
        try {
            const user = await this.entityModel.findOneAndUpdate(
                {
                    is_anon: true,
                    email: `${uid}.anon@temp-user.com`
                },
                {
                    $addToSet: { uid },
                },
                {
                    upsert: true,
                    new: true
                }
            );
            return user;
        } catch (error) {
            throw error;
        }
    }

    public projectSafeEntity(entity: UserDocument): Partial<UserDocument> {
        return _.pick(entity, [
            'email', 
            'profile_data',
            'notification',
            'finish_onboarding'
        ])
    }

}