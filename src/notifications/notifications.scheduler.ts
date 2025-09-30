import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FirebaseService } from "src/firebase/firebase.service";
import * as admin from "firebase-admin";
import { CreateNotificationDto } from "./notification.dto";

type NotificationRecord = CreateNotificationDto & {
  title: string;
  body: string;
  url: string;
  navigation_id: string;
  topic: string;
  sendAt: number;
  status: "pending" | "sent" | "failed";
  createdAt: number;
  sentAt?: number;
  response?: string;
  error?: string;
};

@Injectable()
export class NotificationScheduler {
  private readonly logger = new Logger(NotificationScheduler.name);

  constructor(private readonly firebase: FirebaseService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug("Checking for schedualed notifications...");

    const db = admin.database();
    const ref = db.ref("announcements");

    // call pending notifications
    const snapshot = await ref
      .orderByChild("status")
      .equalTo("pending")
      .once("value");

    const notifications = snapshot.val() as Record<string, NotificationRecord>;

    if (!notifications) return;

    const now = Date.now();

    for (const [id, notif] of Object.entries(notifications)) {
      console.log("notif", notif);
      console.log({ past: notif.sendAt <= now, future: notif.sendAt > now });
      console.log({ now: now, sendAt: notif.sendAt });
      if (notif.sendAt <= now) {
        console.log("firing");
        try {
          await admin.messaging().send({
            topic: "marketing_and_events",
            notification: {
              title: notif.title,
              body: notif.body,
            },
            data: {
              url: notif.url,
              navigation_id: notif.navigation_id,
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
          });

          // update status to sent

          await ref
            .child(id)
            .update({ status: "sent", sentAt: new Date().toISOString() });

          this.logger.log(`Notification ${id} sent successfully`);
        } catch (error: any) {
          this.logger.error(`Error sending notification ${id}`, error.stack);

          await ref.child(id).update({
            status: "failed",
            error: error.message,
          });
        }
      }
    }
  }
}
