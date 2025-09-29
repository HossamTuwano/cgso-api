import { FirebaseService } from "../firebase/firebase.service";
import { CreateNotificationDto } from "./notification.dto";
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendNotification(dto: CreateNotificationDto): Promise<{
        success: boolean;
        id: string;
        response?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        response: string;
        id?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
        response?: undefined;
    }>;
}
