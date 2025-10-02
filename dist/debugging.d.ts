import { Message } from "firebase-admin/lib/messaging/messaging-api";
declare const message: {
    topic: string;
    notification: {
        title: string;
        body: string;
    };
    data: {
        click_action: string;
        url: string;
        navigation_id: string;
    };
    android: {
        priority: "high";
    };
    apns: {
        headers: {
            "apns-priority": string;
            "apns-push-type": string;
            "apns-topic": string;
        };
        payload: {
            aps: {
                alert: {
                    title: string;
                    body: string;
                };
                sound: string;
            };
        };
    };
};
declare const data_only: Message;
export { data_only, message };
