import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications/notification.controller";
import { FirebaseService } from "./firebase/firebase.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificationsController],
  providers: [FirebaseService],
})
export class AppModule {}
