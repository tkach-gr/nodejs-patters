export class ResponseWriter {
    constructor(resp) {
        this.resp = resp
    }

    send(data) {
        this.resp.push(data)
    }
}