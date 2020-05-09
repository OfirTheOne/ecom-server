
export interface IMailer {
    sandMail(from: string, to: string, subject: string, body: string): Promise<boolean>;
}