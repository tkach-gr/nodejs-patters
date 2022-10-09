import {Iterator} from "./iterator.js";

export class ReversedListIterator extends Iterator {
    constructor(lastNode) {
        super()

        this._node = lastNode
    }

    getNext() {
        const value = this._node.value

        this._node = this._node.prev

        return value
    }

    hasMore() {
        const node = this._node
        return node !== null && node !== undefined
    }
}