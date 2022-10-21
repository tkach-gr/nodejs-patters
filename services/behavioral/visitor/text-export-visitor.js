import {Visitor} from "./visitor.js";

export class TextExportVisitor extends Visitor {
    constructor(writer) {
        super()

        this.writer = writer
    }

    acceptPlayer(player) {
        const health = `[health:${player.health}]`
        const weapon = `[weapon:${player.weapon}]`
        const armor = `[armor:${player.armor}]`
        const resp = `Player ${health} ${weapon} ${armor}`

        this.writer.send(resp)
    }

    acceptEnemy(enemy) {
        const health = `[health:${enemy.health}]`
        const position = `[position:${enemy.position}]`
        const resp = `Player ${health} ${position}`

        this.writer.send(resp)
    }
}