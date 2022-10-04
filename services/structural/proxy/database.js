export class Database {
    constructor() {
        this.counter = 0
        this.storage = new Map()
    }

    getAll() {
        const entries = [...this.storage.entries()]
        return entries.map(([key, item]) => ({
            id: key,
            value: item
        }))
    }

    get(id) {
        const item = this.storage.get(id)
        if (!item) {
            throw new Error('invalid id')
        }

        return item
    }

    add(item) {
        const id = this.counter++
        this.storage.set(id, item)
        return id
    }

    delete(id) {
        const item = this.storage.get(id)
        if (!item) {
            throw new Error('invalid id')
        }

        this.storage.delete(id)
    }
}