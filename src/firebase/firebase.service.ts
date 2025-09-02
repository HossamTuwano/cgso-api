import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../piedmont-discovery-702f2-firebase-adminsdk-fbsvc-ba2f6b8eb8.json";

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
    });
  }

}
