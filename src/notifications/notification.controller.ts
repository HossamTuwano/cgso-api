import { Controller, Post, Body } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";
import admin from "firebase-admin";
import { CreateNotificationDto } from "./notification.dto";
import { title } from "process";
import { error } from "console";
import { DateTime } from "luxon";

const message = "Terminate all Jedi";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async sendNotification(@Body() dto: CreateNotificationDto) {
    console.log({ date: dto.date, time: dto.time });
    // const sendAt = new Date(`${dto.date}T${dto.time}:00Z`).getTime();
    const sendAt = DateTime.fromISO(`${dto.date}T${dto.time}`, {
      zone: "America/New_York", // "America/New_York"
    })
      .toUTC()
      .toMillis();

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
      error: "",
    });

    return { success: true, id: ref.key };
  }
}
