import {Visitor} from "./visitor.js";

export class JsonExportVisitor extends Visitor {
    constructor(writer) {
        super()

        this.writer = writer
    }

    acceptPlayer(player) {
        this.writer.send({
            health: player.health,
            weapon: player.weapon,
            armor: player.armor
        })
    }

    acceptEnemy(enemy) {
        this.writer.send({
            health: enemy.health,
            position: enemy.position,
        })
    }
}