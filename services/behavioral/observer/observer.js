export class Observer {
    constructor() {
        this.subscribers = []
    }

    getSubscribers() {
        return this.subscribers
    }

    add(subscriber) {
        const index = this.subscribers.findIndex(item => item === subscriber)
        if (index !== -1) {
            throw new Error(`item with name ${subscriber.name} already exists`)
        }

        this.subscribers.push(subscriber)
    }

    remove(subscriber) {
        const index = this.subscribers.findIndex(item => item === subscriber)
        if (index === -1) {
            throw new Error(`not found item with name ${subscriber.name}`)
        }

        this.subscribers.splice(index, 1)
    }

    notifySubscribers(message) {
        for(let item of this.subscribers) {
            item.update(message)
        }
    }
}