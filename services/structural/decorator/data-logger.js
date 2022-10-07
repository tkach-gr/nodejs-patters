import {DataDecorator} from "./data-decorator.js";

export class DataLogger extends DataDecorator {
    execute() {
        const info = this.data.execute()
        const currentDate = new Date().toISOString()
        console.log(`[${currentDate}] called execute, got: "${info}"`)

        return info
    }
}