import {Iterator} from "./iterator.js";

export class ListIterator extends Iterator {
    constructor(firstNode) {
        super()

        this._node = firstNode
    }

    getNext() {
        const value = this._node.value

        this._node = this._node.next

        return value
    }

    hasMore() {
        const node = this._node
        return node !== null && node !== undefined
    }
}