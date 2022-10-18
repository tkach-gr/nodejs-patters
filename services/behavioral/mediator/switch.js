import {EventSender} from "./event-sender.js";

export class Switch extends EventSender {
    constructor(mediator) {
        super(mediator)

        this.value = false
    }

    input(val) {
        this.value = val
        this.mediator.notify(this, 'input')
    }
}