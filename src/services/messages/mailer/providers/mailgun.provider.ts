
import * as config from 'config';

import { IMailer } from "../i-mailer.model";



export class MailgunProvider implements IMailer {

    async sandMail(from: string, to: string, subject: string, body: string): Promise<boolean> {
        return true;
    }

}