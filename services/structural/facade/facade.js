import {Parser} from "./parser.js";
import {Validator} from "./validator.js";
import {Saver} from "./saver.js";
import {Fetcher} from "./fetcher.js";

export class Facade {
    constructor() {
        this.storage = []

        this.parser = new Parser()
        this.validator = new Validator()
        this.saver = new Saver(this.storage)

        this.fetcher = new Fetcher(this.storage)
    }

    save(rawItem) {
        const item = this.parser.parse(rawItem)

        const isValid = this.parser.parse(rawItem)
        if (!isValid) {
            throw new Error('invalid item')
        }

        return this.saver.save(item)
    }

    getById(id) {
        return this.fetcher.fetch(id)
    }

    getAll() {
        return this.storage
    }
}