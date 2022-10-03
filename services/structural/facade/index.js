import {Facade} from "./facade.js";

export class FacadeService {
    constructor() {
        this.facade = new Facade()
    }

    getById(id) {
        return this.facade.getById(id)
    }

    getAll() {
        return this.facade.getAll()
    }

    save(item) {
        return this.facade.save(item)
    }
}