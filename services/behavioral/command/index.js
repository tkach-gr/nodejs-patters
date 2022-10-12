import {Dispatcher} from "./dispatcher.js";
import {ScaleCommand} from "./scale-command.js";
import {MoveCommand} from "./move-command.js";

export class CommandService {
    constructor() {
        this.dispatcher = new Dispatcher()
    }

    getQueue() {
        return this.dispatcher.getQueue()
    }

    addScaleCommand() {
        const command = new ScaleCommand(this.dispatcher.executedCommands)
        this.dispatcher.addToQueue(command)
    }

    addMoveCommand() {
        const command = new MoveCommand(this.dispatcher.executedCommands)
        this.dispatcher.addToQueue(command)
    }

    getExecuted() {
        return this.dispatcher.getExecuted()
    }

    executeAll() {
        this.dispatcher.executeAll()
    }

    revokeLast() {
        this.dispatcher.revokeLast()
    }
}