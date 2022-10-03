export class Parser {
    parse(item) {
        if (typeof item !== "string") {
            throw new Error('invalid item')
        }

        return `parsed: ${item}`
    }
}