import {NotificationStrategy} from "./notification-strategy.js";

export class TelegramNotification extends NotificationStrategy {
    send(message) {
        return `Message in telegram: ${message}`
    }
}