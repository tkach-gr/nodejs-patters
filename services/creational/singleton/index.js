import {Counter} from "./counter.js";

export class SingletonService {
    get count() {
        const counter = new Counter()
        return counter.count
    }

    increment() {
        const counter = new Counter()
        counter.increment()
    }
}