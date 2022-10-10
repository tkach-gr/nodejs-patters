import {Observer} from "./observer.js";
import {EmailNotifier} from "./email-notifier.js";
import {SmsNotifier} from "./sms-notifier.js";
import {MessengerNotifier} from "./messenger-notifier.js";

export class ObserverService {
    constructor() {
        this.observer = new Observer()
        this.messages = []

        const delegate = this.addMessage.bind(this)

        this.notifiers = {
            email: new EmailNotifier(delegate),
            sms: new SmsNotifier(delegate),
            messenger: new MessengerNotifier(delegate),
        }
    }

    addMessage(message) {
        this.messages.push(message)
    }

    getAllNotifiers() {
        return Object.values(this.notifiers).map(item => item.name)
    }

    getCurrentNotifiers() {
        return this.observer.getSubscribers().map(item => item.name)
    }

    addNotifier(name) {
        const notifier = this.notifiers[name]
        if (!notifier) {
            throw new Error('invalid notifier name')
        }

        this.observer.add(notifier)
    }

    removeNotifier(name) {
        const notifier = this.notifiers[name]
        if (!notifier) {
            throw new Error('invalid notifier name')
        }

        this.observer.remove(notifier)
    }

    getNotifications() {
        return this.messages
    }

    notify(message) {
        this.observer.notifySubscribers(message)
    }
}