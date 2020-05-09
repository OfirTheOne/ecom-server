
export interface ISmsSender {
    sendSms(phoneNumber: string, messageContentArgs: {[key: string]: string}): Promise<string>;
    buildBody(bodyArgs: {[key: string]: string}): string;
}