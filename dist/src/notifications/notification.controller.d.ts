import { FirebaseService } from "../firebase/firebase.service";
import { CreateNotificationDto } from "./notification.dto";
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendNotification(dto: CreateNotificationDto): Promise<{
        success: boolean;
        id: string;
    }>;
}
