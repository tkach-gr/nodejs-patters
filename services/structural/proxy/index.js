import {Database} from "./database.js";
import {Proxy} from "./proxy.js";

export class ProxyService {
    constructor() {
        const db = new Database()
        this.db = new Proxy(db)
    }

    getAll() {
        return this.db.getAll()
    }

    get(id) {
        return this.db.get(id)
    }

    add(item) {
        return this.db.add(item)
    }

    delete(id) {
        return this.db.delete(id)
    }
}