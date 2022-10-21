import {Entity} from "./entity.js";

export class Enemy extends Entity {
    constructor(health, position) {
        super()

        this.health = health
        this.position = position
    }

    accept(visitor) {
        visitor.acceptEnemy(this)
    }
}