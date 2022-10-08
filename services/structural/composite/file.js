import {FileSystemEntity} from "./file-system-entity.js";

export class File extends FileSystemEntity {
    constructor(name, extension) {
        super(`${name}.${extension}`);
    }

    getTree() {
        return this.name
    }
}