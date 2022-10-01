export class Robot {
    constructor(name, version) {
        this.name = name
        this.version = version
    }

    clone() {
        return new Robot(this.name, this.version)
    }
}