import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications/notification.controller";
import { FirebaseService } from "./firebase/firebase.service";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { NotificationScheduler } from "./notifications/notifications.scheduler";

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [NotificationsController],
  providers: [FirebaseService, NotificationScheduler],
  // providers: [FirebaseService],
})
export class AppModule {}
