import {EventSender} from "./event-sender.js";

export class Button extends EventSender {
    constructor(mediator) {
        super(mediator)

        this.isDisabled = false
    }

    click() {
        if (this.isDisabled) {
            throw new Error(`can't click on disabled button`)
        }

        this.mediator.notify(this, 'click')
    }
}