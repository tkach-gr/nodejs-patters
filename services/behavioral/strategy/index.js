import {Bot} from "./bot.js";
import {TelegramNotification} from "./telegram-notification.js";
import {ViberNotification} from "./viber-notification.js";
import {WhatsappNotification} from "./whatsapp-notification.js";

export class StrategyService {
    constructor() {
        this.bot = new Bot()

        this.notificationStrategies = {
            telegram: new TelegramNotification(),
            viber: new ViberNotification(),
            whatsapp: new WhatsappNotification(),
        }
    }

    getStrategies() {
        return Object.keys(this.notificationStrategies)
    }

    setStrategy(name) {
        const strategy = this.notificationStrategies[name]
        if (!strategy) {
            throw new Error('invalid strategy name')
        }

        this.bot.setNotificationStrategy(strategy)
    }

    send(message) {
        return this.bot.send(message)
    }
}