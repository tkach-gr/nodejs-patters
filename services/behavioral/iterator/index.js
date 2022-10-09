import {List} from "./list.js";

export class IteratorService {
    constructor() {
        this.list = new List()
    }

    getList() {
        const iterator = this.list.getIterator()
        return this.getListByIterator(iterator)
    }

    getReversedList() {
        const iterator = this.list.getReversedIterator()
        return this.getListByIterator(iterator)
    }

    getListByIterator(iterator) {
        const output = []

        while(iterator.hasMore()) {
            output.push(iterator.getNext())
        }

        return output
    }

    add(value) {
        this.list.add(value)
    }
}