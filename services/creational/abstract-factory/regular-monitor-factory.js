import {RegularHdMonitor} from "./regular-hd-monitor.js";
import {RegularUltraHdMonitor} from "./regular-ultra-hd-monitor.js";

export class RegularMonitorFactory {
    createHdMonitor() {
        return new RegularHdMonitor()
    }

    createUltraHdMonitor() {
        return new RegularUltraHdMonitor()
    }
}