export class Input {
    constructor(mediator) {
        this.mediator = mediator
        this.value = ''
    }

    input(val) {
        this.value = val
        this.mediator.notify(this, 'input')
    }
}