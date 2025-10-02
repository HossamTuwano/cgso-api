import { Message } from "firebase-admin/lib/messaging/messaging-api";

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
    priority: "high" as const,
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

const data_only: Message = {
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

export { data_only, message };
