import {ComputerBuilder} from "./computer-builder.js";
import {ComputerDirector} from "./computer-director.js";

export class BuilderService {
    constructor() {
        const builder = new ComputerBuilder()
        this.director = new ComputerDirector(builder)

        this.models = {
            old: () => this.director.buildOldComputer(),
            modern: () => this.director.buildModernComputer(),
            pro: () => this.director.buildProComputer(),
        }
    }

    getModels() {
        return Object.keys(this.models)
    }

    build(model) {
        const callback = this.models[model]
        if (typeof callback !== 'function') {
            throw new Error('invalid computer model')
        }

        return callback()
    }
}