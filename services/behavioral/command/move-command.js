import {Command} from "./command.js";

export class MoveCommand extends Command {
    constructor(collection) {
        const name = 'move'
        super(name, collection)
    }
}