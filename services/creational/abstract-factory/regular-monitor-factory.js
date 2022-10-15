import {RegularHdMonitor} from "./regular-hd-monitor.js";
import {RegularUltraHdMonitor} from "./regular-ultra-hd-monitor.js";
import {MonitorFactory} from "./monitor-factory.js";

export class RegularMonitorFactory extends MonitorFactory {
    createHdMonitor() {
        return new RegularHdMonitor()
    }

    createUltraHdMonitor() {
        return new RegularUltraHdMonitor()
    }
}