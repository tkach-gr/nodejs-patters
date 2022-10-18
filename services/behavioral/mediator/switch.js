export class Switch {
    constructor(mediator) {
        this.mediator = mediator
        this.value = false
    }

    input(val) {
        this.value = val
        this.mediator.notify(this, 'input')
    }
}