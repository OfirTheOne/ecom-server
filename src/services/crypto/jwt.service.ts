/**
  *
  * Welcome to the JWT (Json Web Tokens)
  *
  * In order to use this module you need to accomplish to the following task:
  * 1. npm install jsonwebtoken --save
  * 2. npm install bcryptjs --save
  * 3. create a complex key that should be saved in the config file
  *
  * several notes:
  * 1. When sending the token it should be on the authorization section under the bearer key
  * 2. Once the a user is being verified his token, you should save it to res.locals.userID and check if the verified user has the right permissions to do the current query.
  * 3. if you gets an error from the verified function you should send special error code to the client like: res.status(401).json('Failed to authenticate token.');
*/



import { sign, verify } from 'jsonwebtoken';
import * as config from 'config';
// import { InvalidTokenError } from '../../errors';
import { Provider } from '@o-galaxy/ether/core';


@Provider()
export class JWTService {

	public readonly forToken: { key: string, value: string } = config.get('Security.Request.ForToken')
	private readonly expirationDuration: number = Date.now() * 10000;

	/**
	 * Create a token from a user Id.
	 *
	 * @static
	 * @param {*} userID
	 * @returns {string}
	 * @memberof JWTController
	 */
	public signToken(
		payload: {[key: string]: any},
		secret: string = this.forToken.value,
		expiration: number = this.expirationDuration
	): string {
		let token = sign(payload, secret, {
			expiresIn: expiration
		});

		return token;
	}

	/**
	 * Verify received token.
	 *
	 * @static
	 * @param {string} token
	 * @returns {(Promise<{id: string}>)}
	 * @memberof JWTController
	 */
	public async verifyToken(token: string, secret: string = this.forToken.value): Promise<string | object> {
		try {
			const decodedToken = await verify(token, secret);
			return decodedToken;
		} catch (err) {
			throw new  Error();//InvalidTokenError();
		}
	}

	/**
	 *Remove the Bearer from  header token
	 *
	 * @static
	 * @param {string} authHeader
	 * @returns {string}
	 * @memberof JWTController
	 */
	public cleanReceivedToken(authHeader: string): string {
		let token;
		if (authHeader && authHeader.includes("Bearer ")) {
			token = authHeader.substring(7, authHeader.length);
		}
		return token;
	}
}
