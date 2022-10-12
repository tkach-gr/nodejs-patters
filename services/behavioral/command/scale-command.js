import {Command} from "./command.js";

export class ScaleCommand extends Command {
    constructor(collection) {
        const name = 'scale'
        super(name, collection)
    }
}