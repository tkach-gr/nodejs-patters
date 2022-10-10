import {Subscriber} from "./subscriber.js";

export class MessengerNotifier extends Subscriber {
    constructor(delegate) {
        super('messenger')

        this.delegate = delegate
    }

    update(message) {
        this.delegate(`MessengerNotifier -> ${message}`)
    }
}