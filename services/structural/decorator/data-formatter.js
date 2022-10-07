import {DataDecorator} from "./data-decorator.js";

export class DataFormatter extends DataDecorator {
    execute() {
        const info = this.data.execute()
        return `formatted data: [${info.toUpperCase()}]`
    }
}