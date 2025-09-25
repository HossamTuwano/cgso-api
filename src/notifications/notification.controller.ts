import { Controller, Post, Body } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import admin from "firebase-admin";

const message = "Terminate all Jedi";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async sendNotification(
    @Body()
    body: {
      title: string;
      body?: string;
      url?: string;
      navigation_id: " ";
    }
  ) {
    const payload = {
      topic: "marketing_and_events",
      notification: {
        title: body.title || "Order 66",
        body: body.body || message,
      },
      data: {
        url: body.url || "",
        navigation_id: body.navigation_id || "ParksList",
      },
      android: {
        priority: "high" as const,
      },
      apns: {
        headers: {
          "apns-priority": "10",
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
