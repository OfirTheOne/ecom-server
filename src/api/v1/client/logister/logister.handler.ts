
import { Provider } from "@o-galaxy/ether/core";
import { FirebaseService } from './../../../../services/firebase/firebase.service';
import { UserRepository } from '../../../../dl/mongodb/user/user.repository';


@Provider()
export class LogisterHandler {

	constructor(
		private firebaseService: FirebaseService, 
		private userRepository: UserRepository
	) { }

	public async logister(uid: string, email: string, initialPayload: {[key: string]: any}) {
        try {
            const userRecord = await this.firebaseService.getUserByUid(uid);
            if(userRecord == undefined) {
                throw 'user not found';
            }
        } catch (error) {
            throw error;
        }

		try {
			const user = await this.userRepository.loginUser(
				uid, email, initialPayload
			)

			
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async anonLogister(uid: string) {
		try {
            const userRecord = await this.firebaseService.getAnonUserByUid(uid);
            if(userRecord == undefined) {
                throw 'user not found';
            }
        } catch (error) {
            throw error;
        }

		try {
			const user = await this.userRepository.loginAnonUser(
				uid,
			)

			
			return user;
		} catch (error) {
			throw error;
		}
	}
}



