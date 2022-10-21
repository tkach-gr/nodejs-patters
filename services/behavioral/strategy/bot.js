export class Bot {
    constructor() {
        this.notificationStrategy = null
    }

    setNotificationStrategy(strategy) {
        this.notificationStrategy = strategy
    }

    send(message) {
        if (!this.notificationStrategy) {
            throw new Error(`notification strategy wasn't set`)
        }

        return this.notificationStrategy.send(message)
    }
}