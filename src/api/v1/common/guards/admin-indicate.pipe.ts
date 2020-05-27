import { Guard } from '@o-galaxy/ether/core';
import { IGuard } from "@o-galaxy/ether/models";

import * as config from 'config';
// import { UnauthorizedRequestError } from './../../../errors/unauthorized-request.error'

@Guard()
export class AdminIndicatePipe implements IGuard {
    async guard(req, res): Promise<boolean> {
        try {
            res.locals.isAdmin = true;

            return true;
        } catch (error) {
            throw error;
        } 
    }
}