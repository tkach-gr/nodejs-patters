export class DataDecorator {
    constructor(data) {
        this.data = data
    }

    execute() {
        return this.data.execute()
    }
}