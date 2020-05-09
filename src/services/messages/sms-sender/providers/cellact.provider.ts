
import * as rp from 'request-promise';
import * as config from 'config';
import { Provider } from '@o-galaxy/ether/core';
import { ISmsSender } from "../i-sms-sender.model";

@Provider()
export class CellactProvider implements ISmsSender {

    private username: string = process.env.CELLACT_USERNAME
    private password: string = process.env.CELLACT_PASSWORD
    private company: string = process.env.CELLACT_COMPANY
    private endpoint: string = config.get<string>('Messages.SMS.Cellact.endpoint')

    public async sendSms(
        phoneNumber: string, 
        messageContentArgs: { messageContentPrefix: string, code: string }
    ): Promise<string> {
        
        const body = this.buildBody({...messageContentArgs, phoneNumber});
        try {
            return await rp(
            {
                url: this.endpoint,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'text/xml;charset=utf-8'
                }
            })
        } catch (error) {
            throw error;
        } 
    }

    public buildBody(bodyArgs: { phoneNumber, code, messageContentPrefix }) {
        const messageContent = `שלום, ${bodyArgs.code}  הינו קוד אימות זמני לחשבונך ב ${bodyArgs.messageContentPrefix}`

        return this.createXmlBody(
            bodyArgs.phoneNumber,
            messageContent,
            this.username,
            this.password,
            this.company
        );
    }

    private createXmlBody(phone: string, content: string, username: string, password: string, company: string): string {
        return  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.cellact.com/webservices/">
        <soapenv:Header></soapenv:Header>
        <soapenv:Body>
        <web:SendText>
        <web:credentials>
        <web:username>${username}</web:username>
        <web:password>${password}</web:password>
        <web:company>${company}</web:company>
        </web:credentials>
        <web:content>${content}</web:content>
        <web:destinationAddressSet>
        <web:string>${phone}</web:string>
        </web:destinationAddressSet>
        </web:SendText>
        </soapenv:Body>
        </soapenv:Envelope>`
    }
}