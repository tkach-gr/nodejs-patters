import {HdMonitor} from "./hd-monitor.js";

export class WideHdMonitor extends HdMonitor {
    constructor() {
        super()

        this.resolution = '2560×1080'
    }

    getResolution() {
        return this.resolution
    }
}