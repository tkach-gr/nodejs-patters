export class Counter {
    constructor() {
        if (Counter.instance) {
            return Counter.instance
        }

        this._count = 0

        Counter.instance = this
    }

    get count() {
        return this._count
    }

    increment() {
        this._count++
    }
}