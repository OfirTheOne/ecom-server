

import { Guard } from '@o-galaxy/ether/core';
import { IGuard } from "@o-galaxy/ether/models";
import { Request, Response } from 'express'

// import { InvalidTokenError } from '../../../errors';
import { JWTService } from '../../../../services/crypto/jwt.service';
import { CryptoService } from '../../../../services/crypto/crypto.service';



@Guard()
export class AuthTokenVerificationGuard implements IGuard {

	jwtService = new JWTService();
	cryptoService = new CryptoService();
    async guard(req: Request, res: Response): Promise<boolean> {
        const {token} = req.headers;
		if (!token) {
			throw new Error();// invalidTokenError();
		} 
		try {
            const decryptToken = this.cryptoService.decrypt(token as string);
			let decodedToken = await this.jwtService.verifyToken(decryptToken);
			res.locals['decodedToken'] = decodedToken;
			return true;
		} catch (error) {
			throw new Error();// InvalidTokenError();
		}
	}
}