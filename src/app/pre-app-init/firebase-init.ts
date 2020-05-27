
// import * as admin sfrom 'firebase-admin';

import { FirebaseService } from '../../services/firebase/firebase.service';

// function initFirebase() {
//     admin.initializeApp({
//         credential: admin.credential.applicationDefault(),
//         databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
//     });
//     if (process.env.LOCAL_FIREBASE_UID) {
//         FirebaseUtils.getIdToken(process.env.LOCAL_FIREBASE_UID);
//     }
// }
FirebaseService.initFirebase();
if(process.env.NODE_ENV == "default") {
	FirebaseService.getIdToken(process.env.DEBUG_FIREBASE_UID)
		.then(uid => {
			console.log(uid)
		})
		.catch(e => console.log(e))
}
