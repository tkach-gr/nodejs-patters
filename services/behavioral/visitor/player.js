import {Entity} from "./entity.js";

export class Player extends Entity {
    constructor(health, weapon, armor) {
        super()

        this.health = health
        this.weapon = weapon
        this.armor = armor
    }

    accept(visitor) {
        visitor.acceptPlayer(this)
    }
}