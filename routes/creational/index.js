import express from "express";
import { BaseRoute } from "../base-route.js";
import { SingletonRoute } from "./singleton.js";
import { PrototypeRoute } from "./prototype.js";
import { BuilderRoute } from "./builder.js";
import { FactoryRoute } from "./factory.js";
import { AbstractFactoryRoute } from "./abstract-factory.js";

export class CreationalRoute extends BaseRoute {
    constructor() {
        super();

        this.singletonRoute = new SingletonRoute()
        this.prototypeRoute = new PrototypeRoute()
        this.builderRoute = new BuilderRoute()
        this.factoryRoute = new FactoryRoute()
        this.abstractFactoryRoute = new AbstractFactoryRoute()
    }

    router() {
        const router = express.Router()

        router.use('/singleton', this.singletonRoute.router())
        router.use('/prototype', this.prototypeRoute.router())
        router.use('/builder', this.builderRoute.router())
        router.use('/factory', this.factoryRoute.router())
        router.use('/abstract-factory', this.abstractFactoryRoute.router())

        return router
    }
}