import { Guard } from "@o-galaxy/ether/core";
import { IGuard } from "@o-galaxy/ether/models";

import { FirebaseService } from '../../../../services/firebase/firebase.service';

@Guard() 
export class FirebaseAuthTokenGuard implements IGuard {
    private firebaseService: FirebaseService = new FirebaseService()
    constructor() {}

    async guard(req, res) {
        try {
            let { authorization } = req.headers;
            authorization = this.parseAuthHeader(authorization);
            const uid =  await this.firebaseService.verifyToken(authorization);
            if(!uid) {
                throw Error('forbidden');
            }
            res.locals.uid = uid;
            return true;
        } catch (error) {
            return false;
        } 
    }

    parseAuthHeader(header: string): string {
        if(header.indexOf('Bearer') != 0) {
            throw 'bad auth header';
        }
        return header.slice('Bearer '.length);
    }
}