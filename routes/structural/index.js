import express from "express";
import { BaseRoute } from "../base-route.js";
import { AdapterRoute } from "./adapter.js";
import { FacadeRoute } from "./facade.js";
import { FlyweightRoute } from "./flyweight.js";
import { ProxyRoute } from "./proxy.js";

export class StructuralRoute extends BaseRoute {
    constructor() {
        super();

        this.adapterRoute = new AdapterRoute()
        this.facadeRoute = new FacadeRoute()
        this.flyweightRoute = new FlyweightRoute()
        this.proxyRoute = new ProxyRoute()
    }

    router() {
        const router = express.Router()

        router.use('/adapter', this.adapterRoute.router())
        router.use('/facade', this.facadeRoute.router())
        router.use('/flyweight', this.flyweightRoute.router())
        router.use('/proxy', this.proxyRoute.router())

        return router
    }
}