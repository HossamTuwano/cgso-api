import { Module } from '@nestjs/common';
import { NotificationsController} from './notifications/notification.controller'
import { FirebaseService} from './firebase/firebase.service'

@Module({
    imports: [],
  controllers: [NotificationsController],
  providers: [FirebaseService]
})
export class AppModule {

}
