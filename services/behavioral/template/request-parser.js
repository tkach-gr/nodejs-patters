export class RequestParser {
    parse(req) { }

    loadRequest(req) {
        const currentDate = new Date()
        console.log(`[${currentDate}] Load request`)
    }

    parseParams(req) {
        return req.params
    }

    unloadRequest(req) {
        const currentDate = new Date()
        console.log(`[${currentDate}] Unload request`)
    }
}