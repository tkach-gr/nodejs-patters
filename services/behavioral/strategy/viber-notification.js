import {NotificationStrategy} from "./notification-strategy.js";

export class ViberNotification extends NotificationStrategy {
    send(message) {
        return `Message in viber: ${message}`
    }
}