import {GetRequestParser} from "./get-request-parser.js";
import {PostRequestParser} from "./post-request-parser.js";

export class TemplateService {
    parseGet(req) {
        const parser = new GetRequestParser()
        return parser.parse(req)
    }

    parsePost(req) {
        const parser = new PostRequestParser()
        return parser.parse(req)
    }
}