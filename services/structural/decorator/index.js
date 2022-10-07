import {Data} from "./data.js";
import {DataLogger} from "./data-logger.js";
import {DataFormatter} from "./data-formatter.js";

export class DecoratorService {
    getFirstInfoBlock(format, log) {
        return this.getInfoBlock('first info block', format, log)
    }

    getSecondInfoBlock(format, log) {
        return this.getInfoBlock('second info block', format, log)
    }

    getInfoBlock(info, format, log) {
        let data = new Data(info)

        if (format) {
            data = new DataFormatter(data)
        }

        if (log) {
            data = new DataLogger(data)
        }

        return data.execute()
    }
}