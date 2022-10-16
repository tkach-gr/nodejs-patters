import {RequestParser} from "./request-parser.js";

export class GetRequestParser extends RequestParser {
    parse(req) {
        this.loadRequest(req)

        const data = {
            params: this.parseParams(req),
            query: this.parseQuery(req),
        }

        this.unloadRequest(req)

        return data
    }
    
    parseQuery(req) {
        return req.query
    }
}