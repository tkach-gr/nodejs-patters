import {FileSystemEntity} from "./file-system-entity.js";

export class Folder extends FileSystemEntity {
    constructor(name) {
        super(name);

        this.items = new Map()
    }

    get(name) {
        return this.items.get(name)
    }

    add(entity) {
        const exists = this.items.has(entity.name)
        if (exists) {
            throw new Error(`entity "${entity.name}" already exists`)
        }

        this.items.set(entity.name, entity)
    }

    remove(name) {
        const exists = this.items.has(name)
        if (!exists) {
            throw new Error(`entity "${name}" doesn't exist`)
        }

        this.items.delete(name)
    }

    isFolder() {
        return true
    }

    getTree() {
        const tree = {}
        for(const [key, value] of this.items.entries()) {
            tree[key] = value.getTree()
        }

        return tree
    }
}