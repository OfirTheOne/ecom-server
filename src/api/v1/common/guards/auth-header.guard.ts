import { Guard } from '@o-galaxy/ether/core';
import { IGuard } from "@o-galaxy/ether/models";

import * as config from 'config';
// import { UnauthorizedRequestError } from './../../../errors/unauthorized-request.error'

@Guard()
export class AuthHeaderGuard implements IGuard {
    async guard(req, res): Promise<boolean> {
        try {
            const {key, value} = config.get<{key: string, value: string }>('Security.Request.Header')
            const authHeader = req.headers[key.toLowerCase()];
            if(value != authHeader) {
                throw new Error();   
            }
 
            return true;
        } catch (error) {
            throw error;
        } 
    }
}