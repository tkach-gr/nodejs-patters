import {Player} from "./player.js";
import {Enemy} from "./enemy.js";
import {ResponseWriter} from "./response-writer.js";
import {TextExportVisitor} from "./text-export-visitor.js";
import {JsonExportVisitor} from "./json-export-visitor.js";

export class VisitorService {
    constructor() {
        this.entities = [
            new Player(10, 'sword', 'iron'),
            new Enemy(2, 'center'),
        ]
    }

    textExport() {
        const resp = []
        const writer = new ResponseWriter(resp)
        const visitor = new TextExportVisitor(writer)

        for(const entity of this.entities) {
            entity.accept(visitor)
        }

        return resp
    }

    jsonExport() {
        const resp = []
        const writer = new ResponseWriter(resp)
        const visitor = new JsonExportVisitor(writer)

        for(const entity of this.entities) {
            entity.accept(visitor)
        }

        return resp
    }
}