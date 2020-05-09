

import { firestore } from 'firebase-admin';


/** 
 * Firestore docs : 
 * 	+ quick-start :
 * 		https://firebase.google.com/docs/firestore/quickstart
 * */
export class FirestoreController {

	private static db: firestore.Firestore;

	private static initDb() {
		if(!FirestoreController.db) {
			FirestoreController.db = firestore();
		}
	}

	constructor() {
		// FirestoreController.initDb();
	}

	public async readDocument(collection: string, id: string) {
        FirestoreController.initDb();
		try {
			const docRef = await FirestoreController.db.collection(collection).doc(id);
			
			return docRef;
		} catch (error) {
			
		}

	}
	public async createDocument(collection: string, data: object) {
        FirestoreController.initDb();
		try {
			const docRef = await FirestoreController.db.collection(collection).add(data);
			return docRef;
		} catch (error) {
			
		}

	}
	public async editDocument(collection: string, id: string, data: object) {
        FirestoreController.initDb();

		const docRef = await FirestoreController.db.collection(collection).doc(id);
		const docSnapshot = await docRef.get();
		try {
			const writeResult = docSnapshot.exists ? 
				await docRef.update(data) :
				undefined ;

			return writeResult;
			
		} catch(error) {
			console.log(error);
			throw error;
		}
    }  
	public async editOrCreateDocument(collection: string, id: string, data: object): Promise<firestore.DocumentReference> {
        FirestoreController.initDb();

		try {
			let docRef: firestore.DocumentReference = await FirestoreController.db.collection(collection).doc(id);
			const docSnapshot = await docRef.get();

            if(docSnapshot.exists) {
				const writeResult = await docRef.update(data)
                
            } else {
			    docRef = await FirestoreController.db.collection(collection).add(data);
            }   
			return docRef ;
			
		} catch(error) {
			console.log(error);
			throw error;
		}
	}
    public async editOrCreateDocumentWithSpecificId(collection: string, id: string, data: object): Promise<firestore.DocumentReference> {
        FirestoreController.initDb();

		try {
			let docRef: firestore.DocumentReference = await FirestoreController.db.collection(collection).doc(id);
			const docSnapshot = await docRef.get();
            let writeResult: firestore.WriteResult;
            if(docSnapshot.exists) {
				writeResult = await docRef.update(data);
            } else {
			    writeResult = await docRef.set(data);
            }   
			return docRef ;
			
		} catch(error) {
			console.log(error);
			throw error;
		}
	}



}