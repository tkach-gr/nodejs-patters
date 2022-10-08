export class FileSystemEntity {
    constructor(name) {
        if (name.includes('/')) {
            throw new Error(`name can't contain symbol "/"`)
        }

        this.name = name
    }

    get(name) {
        throw new Error(`${this.name} isn't a folder`)
    }

    add() {
        throw new Error(`${this.name} isn't a folder`)
    }

    remove() {
        throw new Error(`${this.name} isn't a folder`)
    }

    isFolder() {
        return false
    }

    getTree() {

    }
}