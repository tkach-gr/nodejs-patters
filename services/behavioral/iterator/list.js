import {Collection} from "./collection.js";
import {ListIterator} from "./list-iterator.js";
import {ReversedListIterator} from "./reversed-list-iterator.js";
import {ListNode} from "./list-node.js";

export class List extends Collection {
    constructor() {
        super()

        this._firstNode = null
        this._lastNode = null
    }

    getIterator() {
        return new ListIterator(this._firstNode)
    }

    getReversedIterator() {
        return new ReversedListIterator(this._lastNode)
    }

    add(value) {
        const node = new ListNode(value, this._lastNode)

        if (this._firstNode === null) {
            this._firstNode = node
            this._lastNode = node
            return
        }

        this._lastNode.next = node
        this._lastNode = node
    }
}