"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.data_only = void 0;
const message = {
    topic: "marketing_and_events",
    notification: {
        title: "dto.title",
        body: " dto.body,",
    },
    data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        url: " dto.url",
        navigation_id: "Notifications",
    },
    android: {
        priority: "high",
    },
    apns: {
        headers: {
            "apns-priority": "10",
            "apns-push-type": "alert",
            "apns-topic": "io.ionic.cgso",
        },
        payload: {
            aps: {
                alert: {
                    title: "dto.title",
                    body: " dto.body",
                },
                sound: "default",
            },
        },
    },
};
exports.message = message;
const data_only = {
    topic: "marketing_and_events",
    data: {
        title: "dto.title",
        body: "dto.body",
        navigation_id: "dto.navigation_id",
        url: "dto.url",
    },
    android: {
        priority: "high",
    },
    apns: {
        headers: {
            "apns-priority": "10",
            "apns-push-type": "alert",
        },
        payload: {
            aps: {
                contentAvailable: true,
            },
        },
    },
};
exports.data_only = data_only;
//# sourceMappingURL=debugging.js.map