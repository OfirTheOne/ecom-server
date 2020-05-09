import * as admin from "firebase-admin";
import * as config from "config";
import { asyncRequest } from "../utils/async-request";
// import { NotificationModel } from '../../db/models/admin/notification.model';

import * as bluebird from "bluebird";

interface MessageBody {
    title: string;
    body: string;
}

interface MessagePayload {
    screen: string
}


/**
 * in config add 
 *     
    "Notifications": {
        "FCM": {
            "topic": "<NAME>-topic"
        }
    },
 * 
 * Send a push notification to an FCM topic.
 * If topic is not provided, 'appTopic' is used. (Sends to all users).
 * Requires clients to subscribe to the topic
 * 
 */


export class NotificationController {


    readonly appTopic = config.get<string>('Notifications.FCM.topic');

    public async sendToTopic(topic: string = this.appTopic, messageBody: MessageBody, payload: { [key: string]: string; } = { screen: "" }) {

        if (!messageBody || !messageBody.title) {
            throw new Error('no title provided');
        }


        const notification = {
            title: messageBody.title,
            body: messageBody.body,
        };


        const message: admin.messaging.Message = {
            notification: notification,
            data: payload,
            apns: {
                headers: {
                    'apns-priority': '10'
                }
            },
            topic: topic
        };

        // const notificationDoc = new NotificationModel({
        //     content: notification.body,
        //     subject: messageBody.title
        // });

        // Send a message to devices subscribed to the provided topic.
        try {
            const response = await admin.messaging().send(message)
            // notificationDoc.set('message_id', response);
        } catch (error) {
            // notificationDoc.set('error', error);
        }

        // await notificationDoc.save();

    }

    /**
     * Toggles topic subscription.
     * If isCurrentlySubscribed is true the device will be unsubscribed 
     * from the topic and vice versa
     * 
     * @param registrationId string firebase registration id
     * @param isCurrentlySubscribed boolean
     */
    public async toggleTopicRegistration(registrationId: string, isCurrentlySubscribed: boolean) {
        if (isCurrentlySubscribed) {
            await this.unregisterFromTopic(registrationId);
        } else {
            await this.registerAppTopic(registrationId);
        }
    }

    public async registerToTopicIfNotRegister(registrationId: string) {
        const data = await this.isSubscribedToTopic(registrationId, this.appTopic)

        if (data.isSubscribed) {
            return { token: registrationId };
        }

        return this.registerAppTopic(registrationId)

    }


    public async isSubscribedToTopic(registrationId: string, topic: string = this.appTopic): Promise<{ isSubscribed: boolean }> {

        try {

            const url = `https://iid.googleapis.com/iid/info/${registrationId}?details=true`;
            const options = {
                json: true,
                // doc : https://developers.google.com/instance-id/reference/server
                headers: { Authorization: `key=${process.env.FB_SERVER_KEY}` }
            };

            const data = await asyncRequest(url, options);
            if (!data || !data.rel || !data.rel.topics) {
                return { isSubscribed: false };
            }

            return { isSubscribed: data.rel.topics[topic] };

        } catch (error) {
            throw error;
            // return  { isSubscribed: false };

        }

    }


    private async registerAppTopic(token: string) {
        try {

            const results = await admin.messaging().subscribeToTopic(token, this.appTopic)

            if (results.errors && results.errors.length > 0) {
                const e = results.errors[0];

                throw e.error;
            } else {
                return { token: token };
            }


        } catch (error) {
            throw error;
        }
    }

    public async unsubscribeMany(tokens: string[]) {

        tokens = await bluebird.filter(tokens, async (token) => {
            return (await this.isSubscribedToTopic(token)).isSubscribed;
        });

        return await bluebird.each(tokens, this.unregisterFromTopic.bind(this));
    }

    private async unregisterFromTopic(token: string) {
        
        const results = await admin.messaging().unsubscribeFromTopic(token, this.appTopic);

        if (results.errors && results.errors.length) {
            var error = results.errors[0];
            throw (error.error);
        } else {
            return { token: token };
        }

    }


    public async isDeviceTokenValid(deviceToken: string) {
        try {
            const response = await admin.messaging().send({ token: deviceToken, notification: { title: 'dry-run' } }, true);
            return true;
        } catch (error) {
            console.log(error);
            if (error.code == 'messaging/invalid-registration-token') {
                return false;
            }
        }
    }

    async getNotificationsHistory(page: number, itemsPerPage: number) {
        // return await NotificationModel
        //     .find()
        //     .skip(itemsPerPage * page)
        //     .limit(itemsPerPage)
        //     .exec();
    }
}
