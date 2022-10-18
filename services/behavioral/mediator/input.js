import {EventSender} from "./event-sender.js";

export class Input extends EventSender {
    constructor(mediator) {
        super(mediator)

        this.value = ''
    }

    input(val) {
        this.value = val
        this.mediator.notify(this, 'input')
    }
}