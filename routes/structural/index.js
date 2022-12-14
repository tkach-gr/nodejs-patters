import express from "express";
import { BaseRoute } from "../base-route.js";
import { AdapterRoute } from "./adapter.js";
import { BridgeRoute } from "./bridge.js";
import { CompositeRoute } from "./composite.js";
import { DecoratorRoute } from "./decorator.js";
import { FacadeRoute } from "./facade.js";
import { FlyweightRoute } from "./flyweight.js";
import { ProxyRoute } from "./proxy.js";

export class StructuralRoute extends BaseRoute {
    constructor() {
        super();

        this.adapterRoute = new AdapterRoute()
        this.bridgeRoute = new BridgeRoute()
        this.compositeRoute = new CompositeRoute()
        this.decoratorRoute = new DecoratorRoute()
        this.facadeRoute = new FacadeRoute()
        this.flyweightRoute = new FlyweightRoute()
        this.proxyRoute = new ProxyRoute()
    }

    router() {
        const router = express.Router()

        router.use('/adapter', this.adapterRoute.router())
        router.use('/bridge', this.bridgeRoute.router())
        router.use('/composite', this.compositeRoute.router())
        router.use('/decorator', this.decoratorRoute.router())
        router.use('/facade', this.facadeRoute.router())
        router.use('/flyweight', this.flyweightRoute.router())
        router.use('/proxy', this.proxyRoute.router())

        return router
    }
}