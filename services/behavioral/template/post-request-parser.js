import {RequestParser} from "./request-parser.js";

export class PostRequestParser extends RequestParser {
    parse(req) {
        this.loadRequest(req)

        const data = {
            params: this.parseParams(req),
            body: this.parseBody(req),
        }

        this.unloadRequest(req)

        return data
    }

    parseBody(req) {
        return req.body
    }
}