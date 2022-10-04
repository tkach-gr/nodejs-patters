export class Avatar {
    constructor(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    serialize() {
        return this.name
    }
}