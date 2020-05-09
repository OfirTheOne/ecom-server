
import { Provider } from '@o-galaxy/ether/core';
import * as config from 'config';
import { AES, enc } from 'crypto-js';

@Provider()
export class CryptoService {

    encrypt(plainText: string)   {
        return AES.encrypt(plainText, config.get<string>( "Security.OTP.AccessTokenEncryption.secret")).toString();
    }

    decrypt(ciphertext: string)   {
        const bytes = AES.decrypt(ciphertext, config.get<string>( "Security.OTP.AccessTokenEncryption.secret"));
        return bytes.toString(enc.Utf8)
    }

}