import { Controller, Post, Body } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import admin from "firebase-admin";
import { CreateNotificationDto } from "./notification.dto";
import { title } from "process";

const message = "Terminate all Jedi";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async sendNotification(@Body() dto: CreateNotificationDto) {
    const sendAt = new Date(`${dto.date}T${dto.time}:00Z`).getTime();
    const db = admin.database();
    const ref = db.ref("announcements").push();

    await ref.set({
      title: dto.title,
      body: dto.body,
      url: dto.url,
      navigation_id: dto.navigation_id,
      topic: "marketing_and_events",
      sendAt,
      status: "pending",
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });

    return { success: true, id: ref.key };

    const payload = {
      topic: "marketing_and_events",
      notification: {
        title: dto.title,
        body: dto.body,
      },
      data: {
        url: dto.url,
        navigation_id: dto.navigation_id,
      },
      android: {
        priority: "high" as const,
      },
      apns: {
        headers: {
          "apns-priority": "5",
          "apns-push-type": "background",
        },
        payload: {
          aps: {
            "content-available": 1,
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
