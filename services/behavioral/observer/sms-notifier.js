import {Subscriber} from "./subscriber.js";

export class SmsNotifier extends Subscriber {
    constructor(delegate) {
        super('sms')

        this.delegate = delegate
    }

    update(message) {
        this.delegate(`SmsNotifier -> ${message}`)
    }
}