import { Controller, Post, Body } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import admin from "firebase-admin";
import { CreateNotificationDto } from "./notification.dto";
import { Message } from "firebase-admin/lib/messaging/messaging-api";
import { message } from "debugging";
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async sendNotification(@Body() dto: CreateNotificationDto) {
    const payload = {
      topic: "marketing_and_events",
      data: {
        url: dto.url,
        navigation_id: dto.navigation_id,
        sentTime: Date.now().toLocaleString(),
      },
      android: {
        priority: "high" as const,
      },
      apns: {
        headers: {
          "apns-priority": "5",
          "apns-push-type": "alert",
        },
        payload: {
          aps: {
            alert: {
              title: dto.title,
              body: dto.body,
            },
            sound: "default",
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(payload);
      console.log("Successfully sent", response);

      return { success: true, response };
    } catch (error) {
      console.error("Error sending message", error);
      return { success: false, error: error };
    }
  }
}
