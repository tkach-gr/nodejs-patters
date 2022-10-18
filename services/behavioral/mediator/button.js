export class Button {
    constructor(mediator) {
        this.mediator = mediator
        this.isDisabled = false
    }

    click() {
        if (this.isDisabled) {
            throw new Error(`can't click on disabled button`)
        }

        this.mediator.notify(this, 'click')
    }
}