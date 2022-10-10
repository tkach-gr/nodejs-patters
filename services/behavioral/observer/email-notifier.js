import {Subscriber} from "./subscriber.js";

export class EmailNotifier extends Subscriber {
    constructor(delegate) {
        super('email')

        this.delegate = delegate
    }

    update(message) {
        this.delegate(`EmailNotifier -> ${message}`)
    }
}