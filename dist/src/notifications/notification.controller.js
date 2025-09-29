"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const notification_dto_1 = require("./notification.dto");
const message = "Terminate all Jedi";
let NotificationsController = class NotificationsController {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    sendNotification(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                topic: "marketing_and_events",
                notification: {
                    title: dto.title,
                    body: dto.body,
                },
                data: {
                    url: dto.url,
                    navigation_id: dto.navigation_id,
                },
                android: {
                    priority: "high",
                },
                apns: {
                    headers: {
                        "apns-priority": "5",
                        "apns-push-type": "alert",
                    },
                    payload: {
                        aps: {
                            alert: {
                                title: dto.title,
                                body: dto.body,
                            },
                            sound: "default",
                        },
                    },
                },
            };
            try {
                const response = yield firebase_admin_1.default.messaging().send(payload);
                console.log("Successfully sent", response);
                return { success: true, response };
            }
            catch (error) {
                console.error("Error sending message", error);
                return { success: false, error: error };
            }
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendNotification", null);
NotificationsController = __decorate([
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notification.controller.js.map