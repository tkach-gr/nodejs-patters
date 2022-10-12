export class Command {
    constructor(name, commandsCollection) {
        this.name = name
        this.commandsCollection = commandsCollection

        this.id = -1
    }

    execute(id) {
        this.id = id
        this.commandsCollection.set(id, this)
    }

    revoke() {
        this.commandsCollection.delete(this.id)
    }
}