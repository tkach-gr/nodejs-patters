import express from "express";
import { BaseRoute } from "../base-route.js";
import { SingletonRoute } from "./singleton.js";
import { PrototypeRoute } from "./prototype.js";
import { BuilderRoute } from "./builder.js";

export class CreationalRoute extends BaseRoute {
    constructor() {
        super();

        this.singletonRoute = new SingletonRoute()
        this.prototypeRoute = new PrototypeRoute()
        this.builderRoute = new BuilderRoute()
    }

    router() {
        const router = express.Router()

        router.use('/singleton', this.singletonRoute.router())
        router.use('/prototype', this.prototypeRoute.router())
        router.use('/builder', this.builderRoute.router())

        return router
    }
}