import {NotificationStrategy} from "./notification-strategy.js";

export class WhatsappNotification extends NotificationStrategy {
    send(message) {
        return `Message in whatsapp: ${message}`
    }
}