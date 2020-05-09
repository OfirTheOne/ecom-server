import * as config from 'config';
import { Provider } from "@o-galaxy/ether/core";
import { ISmsSender } from "./i-sms-sender.model";
import { CellactProvider } from "./providers";
import { cleanNonAsciiCharacters } from '../../../services/utils/clean-non-ascii-characters';


@Provider()
export class SmsSenderService {

    private smsConfig = config.get<{[key: string]: string}>("Messages.SMS");
    private coreProvider: ISmsSender = new CellactProvider();

    constructor() { }

    async sendSms(phoneNumber: string, code : string) {
        try {
            phoneNumber = process.env.NODE_ENV == 'development' ? 
                process.env.DEBUG_OTP_PHONE_NUMBER :
                phoneNumber;
    
            phoneNumber = cleanNonAsciiCharacters(phoneNumber)
            return await this.coreProvider.sendSms(
                phoneNumber, 
                { 
                    // all the argument needed to build the message located in the config
                    ...this.smsConfig, 
                    code 
                }
            )
            
        } catch (error) {
            throw error;
        }
    }

    static isSmsSendSuccessfully(smsResult: string) {
        return (smsResult.includes("<result>true</result>"))
    }

}