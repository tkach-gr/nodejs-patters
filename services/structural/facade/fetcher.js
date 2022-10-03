export class Fetcher {
    constructor(storage) {
        this.storage = storage
    }

    fetch(id) {
        const item = this.storage[id]
        if (item === undefined) {
            throw new Error('invalid id')
        }

        return item
    }
}