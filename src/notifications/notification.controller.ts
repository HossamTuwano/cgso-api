import { Controller, Post, Body } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import admin from "firebase-admin";

const message = "marketing notification";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async sendNotification(
    @Body() body: { title: string; body?: string; url?: string }
  ) {
    const payload = {
      notification: {
        title: body.title || "New Notification",
        body: body.body || message,
      },
      data: {
        url: body.url || "",
      },

      topic: "marketing_and_events",
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
