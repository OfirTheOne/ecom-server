import { Provider } from "@o-galaxy/ether/core";
import { IMailer } from "./i-mailer.model";
import { DefaultMailerProvider } from "./providers";


@Provider()
export class MailerService {

    constructor(private coreProvider: IMailer = new DefaultMailerProvider()) { }

    sendMail() {

    }

}