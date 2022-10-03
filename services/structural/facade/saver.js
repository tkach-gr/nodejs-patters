export class Saver {
    constructor(storage) {
        this.storage = storage
    }

    save(item) {
        this.storage.push(item)
        return this.storage.length - 1
    }
}