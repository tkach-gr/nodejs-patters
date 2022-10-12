export class Dispatcher {
    constructor() {
        this.queue = []

        this.executedCounter = 0
        this.executedCommands = new Map()
    }

    getQueue() {
        return this.queue.map(item => item.name)
    }

    addToQueue(command) {
        this.queue.push(command)
    }

    getExecuted() {
        return [...this.executedCommands.values()].map(item => item.name)
    }

    executeAll() {
        for(const command of this.queue) {
            command.execute(this.executedCounter++)
        }

        this.queue = []
    }

    revokeLast() {
        const commands = [...this.executedCommands.values()]
        if (commands.length === 0) {
            throw new Error('executed commands list is empty')
        }

        const last = commands[commands.length - 1]
        console.log(last)
        last.revoke()
    }
}