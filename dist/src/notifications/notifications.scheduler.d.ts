import { FirebaseService } from "src/firebase/firebase.service";
export declare class NotificationScheduler {
    private readonly firebase;
    private readonly logger;
    constructor(firebase: FirebaseService);
    handleCron(): Promise<void>;
}
