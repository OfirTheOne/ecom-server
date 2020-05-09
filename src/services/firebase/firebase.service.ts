
import * as admin from 'firebase-admin';
import * as config from 'config';
import { asyncRequest } from './../utils' 
import * as path from 'path';
import { Provider } from '@o-galaxy/ether/core';


@Provider()
export class FirebaseService {



		private static fbConfig: any = config.get('FB');
		private static fbInitialized: boolean = false;
		public static initFirebase() {
			if(!FirebaseService.fbInitialized) {
				FirebaseService.fbInitialized = true;
				admin.initializeApp({
					databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
				});
			}
			
		}
	

		public cleanReceivedToken(authHeader: string): string {
			return (authHeader?.includes("Bearer ")) ? authHeader.substring(7, authHeader.length) : authHeader
		}
	

		public async verifyToken(token: string): Promise<string | object> {
			try {
				const decodedToken = await admin.auth().verifyIdToken(token);
				var uid = process.env.DEBUG_FIREBASE_UID || decodedToken?.uid;
				return uid;
			} catch (err) {
				return process.env.DEBUG_FIREBASE_UID;
				throw new Error(err);
			}
		}
	
		public static async getIdToken(uid: string) {
			// this.initFirebase();
			const customToken = await admin.auth().createCustomToken(uid)
			const res = await asyncRequest(
				`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FirebaseService.fbConfig.apiKey}`, {
				method: 'POST',
				body: {
					token: customToken,
					returnSecureToken: true
				},
				json: true,
				}
			);
			return res.idToken;
		}
	
		// public static async generateLink(link: string) :Promise<string> {
	
		// 	let params: any = {
		// 		dynamicLinkInfo: {
		// 			domainUriPrefix: FirebaseService.fbConfig.domainUriPrefix,
		// 			link: link,
		// 			androidInfo: {
		// 				androidPackageName: FirebaseService.appInfo.androidPackageName
		// 			},
		// 			iosInfo: {
		// 				iosBundleId: FirebaseService.appInfo.iosBundleId
		// 			}
		// 		},
		// 		suffix: {
		// 			option: "UNGUESSABLE"
		// 		}
		// 	};
	
		// 	let linkData: any = await asyncRequest(
		// 		`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${FirebaseService.fbConfig.apiKey}`, {
		// 		method: 'POST',
		// 		body: params,
		// 		json: true
		// 	});
	
		// 	return linkData.shortLink;
		// }
	
		public async getUserByUid(uid: string) {
			try {
				return await admin.auth().getUser(uid);	
				
			} catch (error) {
				console.log('getUserByUid : ERROR from getUserByUid')
				throw error;
			}
		}

		public async getAnonUserByUid(uid: string) {
			try {
				const record = await admin.auth().getUser(uid);	
				if(!record || record.email != undefined) {
					throw Error('bad anon user.')
				}
				return record;
				
			} catch (error) {
				console.log('getAnonUserByUid : ERROR from getAnonUserByUid')
				throw error;
			}
		}

		public async createAnonUser() {

			try {
				const userRecord = await admin.auth().createUser({})
				console.log('Successfully created new anonymous user:', userRecord.uid);
				return userRecord;
			} catch (error) {
				console.log('Error creating new anonymous user:', error);
				
			}
		}
	}
	
	