import { FirebaseService } from "../firebase/firebase.service";
export declare class NotificationsController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendNotification(body: {
        title: string;
        body?: string;
        url?: string;
        navigation_id: " ";
    }): Promise<{
        success: boolean;
        response: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        response?: undefined;
    }>;
}
