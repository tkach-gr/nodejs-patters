import {RegularMonitorFactory} from "./regular-monitor-factory.js";
import {WideMonitorFactory} from "./wide-monitor-factory.js";

export class AbstractFactoryService {
    createRegularHdMonitor() {
        const factory = new RegularMonitorFactory()
        return factory.createHdMonitor()
    }

    createRegularUltraHdMonitor() {
        const factory = new RegularMonitorFactory()
        return factory.createUltraHdMonitor()
    }

    createWideHdMonitor() {
        const factory = new WideMonitorFactory()
        return factory.createHdMonitor()
    }

    createWideUltraHdMonitor() {
        const factory = new WideMonitorFactory()
        return factory.createUltraHdMonitor()
    }
}