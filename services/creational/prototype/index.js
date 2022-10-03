import {Robot} from "./robot.js";

export class PrototypeService {
    constructor() {
        this.robots = new Map()

        this.robots.set('r2d2', new Robot('r2d2', 1))
        this.robots.set('terminator', new Robot('terminator', 5))
        this.robots.set('steel-can', new Robot('steel-can', 2))
    }

    getRobotsNames() {
        return [...this.robots.keys()]
    }

    produceByClone(originName, newName, newVersion) {
        const robot = this.cloneRobot(originName)

        if (newName) {
            robot.name = newName
        }
        if (newVersion) {
            robot.version = newVersion
        }

        return robot
    }

    cloneRobot(name) {
        const origin = this.robots.get(name)
        if (!origin) {
            throw new Error('invalid robot\'s name')
        }

        return origin.clone()
    }
}