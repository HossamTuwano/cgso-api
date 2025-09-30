"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var NotificationScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const firebase_service_1 = require("../firebase/firebase.service");
const admin = __importStar(require("firebase-admin"));
let NotificationScheduler = NotificationScheduler_1 = class NotificationScheduler {
    constructor(firebase) {
        this.firebase = firebase;
        this.logger = new common_1.Logger(NotificationScheduler_1.name);
    }
    handleCron() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug("Checking for schedualed notifications...");
            const db = admin.database();
            const ref = db.ref("announcements");
            const snapshot = yield ref
                .orderByChild("status")
                .equalTo("pending")
                .once("value");
            const notifications = snapshot.val();
            if (!notifications)
                return;
            const now = Date.now();
            for (const [id, notif] of Object.entries(notifications)) {
                console.log("notif", notif);
                console.log({ past: notif.sendAt <= now, future: notif.sendAt > now });
                console.log({ now: now, sendAt: notif.sendAt });
                if (notif.sendAt <= now) {
                    console.log("firing");
                    try {
                        yield admin.messaging().send({
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
                                priority: "high",
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
                        yield ref
                            .child(id)
                            .update({ status: "sent", sentAt: new Date().toISOString() });
                        this.logger.log(`Notification ${id} sent successfully`);
                    }
                    catch (error) {
                        this.logger.error(`Error sending notification ${id}`, error.stack);
                        yield ref.child(id).update({
                            status: "failed",
                            error: error.message,
                        });
                    }
                }
            }
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationScheduler.prototype, "handleCron", null);
NotificationScheduler = NotificationScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], NotificationScheduler);
exports.NotificationScheduler = NotificationScheduler;
//# sourceMappingURL=notifications.scheduler.js.map